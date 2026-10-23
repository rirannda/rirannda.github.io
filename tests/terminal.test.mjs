import assert from 'node:assert/strict';
import { after, before, beforeEach, test } from 'node:test';
import { createServer } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'node:url';

let server;
let parser;
let filesystem;
let terminal;
let langState;
let worksData;
let visits;
let WorkCard;
let render;

before(async () => {
	server = await createServer({
		configFile: false,
		cacheDir: fileURLToPath(new URL('../node_modules/.vite-terminal-tests', import.meta.url)),
		resolve: { alias: { $lib: fileURLToPath(new URL('../src/lib', import.meta.url)) } },
		server: { middlewareMode: true, hmr: false, ws: false, watch: null },
		plugins: [
			{
				name: 'terminal-test-navigation',
				enforce: 'pre',
				resolveId(id) {
					if (['$app/navigation', '$app/paths', '$app/environment'].includes(id))
						return `\0terminal-test:${id}`;
				},
				load(id) {
					if (id === '\0terminal-test:$app/navigation') {
						return 'export const visits = []; export async function goto(path) { visits.push(path); }';
					}
					if (id === '\0terminal-test:$app/paths')
						return 'export function resolve(path) { return path; }';
					if (id === '\0terminal-test:$app/environment') return 'export const browser = false;';
				}
			},
			svelte({ configFile: false, compilerOptions: { runes: true } })
		]
	});
	parser = await server.ssrLoadModule('/src/lib/terminal/parser.ts');
	filesystem = await server.ssrLoadModule('/src/lib/terminal/filesystem.ts');
	({ terminal } = await server.ssrLoadModule('/src/lib/state/terminalState.svelte.ts'));
	({ langState } = await server.ssrLoadModule('/src/lib/state/langState.svelte.ts'));
	({ worksData } = await server.ssrLoadModule('/src/lib/data/works.ts'));
	({ visits } = await server.ssrLoadModule('$app/navigation'));
	({ default: WorkCard } = await server.ssrLoadModule('/src/lib/components/WorkCard.svelte'));
	({ render } = await server.ssrLoadModule('svelte/server'));
});

after(async () => {
	await server?.close();
});
beforeEach(() => {
	terminal.history = [];
	terminal.output = [];
	terminal.currentPath = '/';
	langState.setLanguage('ja');
	visits.length = 0;
});

test('section paths, home paths, works alias, and relative paths resolve consistently', () => {
	for (const path of [
		'about',
		'/about/',
		'~/portfolio/about',
		'/home/visitor/portfolio/about',
		'../about'
	]) {
		assert.equal(filesystem.resolvePortfolioPath(path, '/skills'), '/about');
	}
	assert.equal(filesystem.resolvePortfolioPath('~/portfolio/top'), '/');
	assert.equal(filesystem.resolvePortfolioPath('/works/../skills'), '/skills');
	assert.equal(filesystem.resolvePortfolioPath('.', '/works'), '/projects');
	assert.equal(filesystem.resolvePortfolioPath('..', '/projects'), '/');
	assert.equal(
		filesystem.resolvePortfolioPath('/home/visitor/portfolio-other'),
		'/home/visitor/portfolio-other'
	);
});

test('ls projects and ls skills list the actual data; ls about works at the root', async () => {
	assert.deepEqual(
		(await parser.parseCommand('ls projects', '/')).response,
		worksData.map((work) => work.id)
	);
	assert.ok((await parser.parseCommand('ls skills', '/')).response.includes('svelte'));
	assert.deepEqual((await parser.parseCommand('ls about', '/')).response, ['about.txt']);
	assert.deepEqual(
		(await parser.parseCommand('ls .', '/projects')).response,
		worksData.map((work) => work.id)
	);
	assert.deepEqual(
		(await parser.parseCommand('ls /works/', '/')).response,
		worksData.map((work) => work.id)
	);
});

test('cat reads projects and skills by ID, name, and explicit path in both languages', async () => {
	for (const command of [
		'cat typ-hl',
		'cat projects/typ-hl',
		'cat /works/typ-hl',
		'cat ~/portfolio/projects/typ-hl'
	]) {
		assert.ok(
			(await parser.parseCommand(command, '/skills')).response.includes(worksData[1].description.ja)
		);
	}
	assert.equal((await parser.parseCommand('cat PortfoliOS', '/')).response[0], 'PortfoliOS');
	assert.match((await parser.parseCommand('cat SVELTE', '/')).response[0], /Svelte/);
	assert.match((await parser.parseCommand('cat "VS Code"', '/')).response[0], /VS Code/);
	assert.match((await parser.parseCommand('cat skills/svelte', '/projects')).response[0], /Svelte/);
	assert.equal((await parser.parseCommand('cat about.txt', '/skills')).response[0], 'Rirannda');
	assert.equal((await parser.parseCommand('cat /missing/typ-hl', '/')).isError, true);
	assert.equal((await parser.parseCommand('cat /missing/about.txt', '/')).isError, true);
	await parser.parseCommand('lang en', '/');
	assert.ok(
		(await parser.parseCommand('cat typ-hl', '/')).response.includes(worksData[1].description.en)
	);
	assert.match((await parser.parseCommand('cat svelte', '/')).response[0], /intermediate/);
});

test('cd navigates to the matching page and handles parent and home paths', async () => {
	for (const path of ['about', '/about', '~/portfolio/about', '/home/visitor/portfolio/about']) {
		await parser.parseCommand(`cd ${path}`, '/');
		assert.equal(visits.at(-1), '/#about');
	}
	await parser.parseCommand('cd projects', '/');
	assert.equal(visits.at(-1), '/works');
	assert.equal(terminal.currentPath, '/projects');
	await parser.parseCommand('cd ..', '/projects');
	assert.equal(visits.at(-1), '/#top');
	await parser.parseCommand('cd ~/portfolio/top', '/skills');
	assert.equal(visits.at(-1), '/#top');
	assert.equal((await parser.parseCommand('cd /root', '/')).isError, true);
});

test('clear and reset remove output without re-logging themselves or removing history', async () => {
	terminal.pushHistory('ls projects');
	for (const command of ['clear', 'reset']) {
		terminal.pushOutput('prompt', 'echo hello', 'hello');
		assert.equal((await parser.parseCommand(command, '/')).skipOutput, true);
		assert.deepEqual(terminal.output, []);
		assert.deepEqual(terminal.history, ['ls projects']);
	}
});

test('history returns numbered reusable commands', async () => {
	assert.equal((await parser.parseCommand('history', '/')).response, '実行履歴はありません。');
	terminal.pushHistory('ls projects');
	terminal.pushHistory('cat typ-hl');
	const result = await parser.parseCommand('history', '/');
	assert.deepEqual(result.historyEntries, [
		{ number: 1, command: 'ls projects' },
		{ number: 2, command: 'cat typ-hl' }
	]);
	assert.deepEqual(result.response, ['1  ls projects', '2  cat typ-hl']);
});

test('help stays synchronized with the supported commands and lang updates help', async () => {
	const help = (await parser.parseCommand('help', '/')).response.join('\n');
	for (const command of parser.availableCommands) assert.ok(help.includes(command));
	assert.ok(!help.includes('ls projects'));
	assert.ok(!help.includes('cat typ-hl'));
	await parser.parseCommand('lang en', '/');
	assert.match((await parser.parseCommand('help cat', '/')).response[1], /Reads a project/);
	await parser.parseCommand('lang ja', '/');
	assert.match((await parser.parseCommand('cat --help', '/')).response[1], /作品/);
	assert.equal((await parser.parseCommand('lang fr', '/')).isError, true);
	assert.equal(langState.current, 'ja');
});

test('open uses existing profile links and project repositories; demos are optional', async () => {
	assert.equal(
		(await parser.parseCommand('open github', '/')).action.url,
		'https://github.com/rirannda'
	);
	assert.equal(
		(await parser.parseCommand('open discord', '/')).action.url,
		'https://discord.com/users/924197940103372831'
	);
	assert.equal((await parser.parseCommand('open typ-hl', '/')).action.url, worksData[1].repoUrl);
	assert.equal(
		(await parser.parseCommand('open PortfoliOS repo', '/')).action.url,
		worksData[0].repoUrl
	);
	assert.equal((await parser.parseCommand('open typ-hl demo', '/')).isError, true);
	const project = worksData[0];
	try {
		project.demoUrl = 'https://example.com/demo';
		project.role = { ja: '担当の例', en: 'Example role' };
		project.highlights = { ja: '工夫の例', en: 'Example highlight' };
		assert.equal(
			(await parser.parseCommand('open portfolio-os demo', '/')).action.url,
			project.demoUrl
		);
		const contents = (await parser.parseCommand('cat portfolio-os', '/')).response.join('\n');
		assert.match(contents, /担当の例/);
		assert.match(contents, /工夫の例/);
		assert.ok(contents.includes(project.demoUrl));
	} finally {
		delete project.demoUrl;
		delete project.role;
		delete project.highlights;
	}
});

test('invalid options and extra arguments have no side effects; echo preserves literal text', async () => {
	assert.equal((await parser.parseCommand('clear extra', '/')).isError, true);
	assert.equal((await parser.parseCommand('lang en extra', '/')).isError, true);
	assert.equal((await parser.parseCommand('cd --invalid', '/')).isError, true);
	assert.equal(visits.length, 0);
	assert.equal((await parser.parseCommand('echo hello -world', '/')).response, 'hello -world');
	assert.equal((await parser.parseCommand('constructor', '/')).isError, true);
});

test('work cards only render configured optional fields and the matching demo link', () => {
	const project = worksData[0];
	const defaultHtml = render(WorkCard, { props: { work: project } }).body;
	assert.ok(!defaultHtml.includes('担当したこと'));
	assert.ok(!defaultHtml.includes('工夫したこと'));
	assert.ok(!defaultHtml.includes('デモを見る'));
	const work = {
		...project,
		role: { ja: '担当の例', en: 'Example role' },
		highlights: { ja: '工夫の例', en: 'Example highlight' },
		demoUrl: 'https://example.com/demo'
	};
	const html = render(WorkCard, { props: { work } }).body;
	assert.ok(html.includes('担当の例'));
	assert.ok(html.includes('工夫の例'));
	assert.ok(html.includes('href="https://example.com/demo"'));
	assert.ok(html.includes('デモを見る'));
});

test('image controls appear only for projects with multiple screenshots', () => {
	const single = render(WorkCard, { props: { work: worksData[0] } }).body;
	assert.ok(!single.includes('前の画像'));
	const multiple = render(WorkCard, { props: { work: worksData[2] } }).body;
	for (const label of ['前の画像', '次の画像', '一時停止']) assert.ok(multiple.includes(label));
});
