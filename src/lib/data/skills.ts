export type Skill = {
	id: string;
	logo: string;
	name: string;
	level: {
		ja: '入門レベル' | '初級' | '中級' | '上級';
		en: 'introductory' | 'beginner' | 'intermediate' | 'advanced';
	};
	description: {
		ja: string;
		en: string;
	};
	group: 'Language' | 'Framework' | 'Library' | 'Tools' | 'Others';
	url: string;
	urltext: string;
	color: string;
};

export const skillsData: Skill[] = [
	{
		id: 'HTML',
		logo: '',
		name: 'HTML',
		level: {
			ja: '中級',
			en: 'intermediate'
		},
		description: {
			ja: '様々なプロジェクトで使用経験あり。',
			en: 'I have experience using it in various projects.'
		},
		group: 'Language',
		url: 'https://developer.mozilla.org/ja/docs/Web/HTML',
		urltext: 'MDN Web Docs - HTML',
		color: 'html'
	},
	{
		id: 'typescript',
		logo: '',
		name: 'TypeScript',
		level: {
			ja: '中級',
			en: 'intermediate'
		},
		description: {
			ja: '本ポートフォリオをはじめ、ウェブ系の様々なプロジェクトで使用経験あり。',
			en: 'I have experience using it in various web projects, including this portfolio.'
		},
		group: 'Language',
		url: 'https://www.typescriptlang.org/',
		urltext: 'TypeScript Official Site',
		color: 'typescript'
	},
	{
		id: 'javascript',
		logo: '',
		name: 'JavaScript',
		level: {
			ja: '中級',
			en: 'intermediate'
		},
		description: {
			ja: '様々なプロジェクトで使用経験あり。最近はTypeScriptを使用することが多い。',
			en: 'I have experience using it in various projects. Recently, I use TypeScript quite often.'
		},
		group: 'Language',
		url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript',
		urltext: 'MDN Web Docs - JavaScript',
		color: 'javascript'
	},
	{
		id: 'css',
		logo: '',
		name: 'CSS',
		level: {
			ja: '中級',
			en: 'intermediate'
		},
		description: {
			ja: '様々なプロジェクトで使用経験あり。',
			en: 'I have experience using it in various projects.'
		},
		group: 'Language',
		url: 'https://developer.mozilla.org/ja/docs/Web/CSS',
		urltext: 'MDN Web Docs - CSS',
		color: 'css'
	},
	{
		id: 'python',
		logo: '',
		name: 'Python',
		level: {
			ja: '初級',
			en: 'beginner'
		},
		description: {
			ja: '実習や簡単なスクリプト作成に使用経験あり。',
			en: 'I have experience using it in internships and simple script creation.'
		},
		group: 'Language',
		url: 'https://www.python.org/',
		urltext: 'Python Official Site',
		color: 'python'
	},
	{
		id: 'rust',
		logo: '',
		name: 'Rust',
		level: {
			ja: '入門レベル',
			en: 'introductory'
		},
		description: {
			ja: '鋭意学習中。',
			en: 'Currently studying intensively.'
		},
		group: 'Language',
		url: 'https://www.rust-lang.org/',
		urltext: 'Rust Official Site',
		color: 'rust'
	},
	{
		id: 'svelte',
		logo: '',
		name: 'Svelte',
		level: {
			ja: '中級',
			en: 'intermediate'
		},
		description: {
			ja: '本ポートフォリオサイトの開発などに使用。',
			en: 'Used for developing this portfolio website and other projects.'
		},
		group: 'Framework',
		url: 'https://svelte.jp/',
		urltext: 'Svelte Official Site',
		color: 'svelte'
	},
	{
		id: 'react',
		logo: '',
		name: 'React',
		level: {
			ja: '中級',
			en: 'intermediate'
		},
		description: {
			ja: '以前のプロジェクトで使用経験あり。',
			en: 'I have experience using it in previous projects.'
		},
		group: 'Library',
		url: 'https://ja.react.dev/',
		urltext: 'React Official Site',
		color: 'react'
	},
	{
		id: 'git',
		logo: '',
		name: 'Git',
		level: {
			ja: '中級',
			en: 'intermediate'
		},
		description: {
			ja: 'バージョン管理ツールとして日常的に使用。',
			en: 'Used as a version control tool in daily work.'
		},
		group: 'Tools',
		url: 'https://git-scm.com/',
		urltext: 'Git Official Site',
		color: 'git'
	},
	{
		id: 'nodejs',
		logo: '',
		name: 'Node.js',
		level: {
			ja: '初級',
			en: 'beginner'
		},
		description: {
			ja: 'npmを用いた依存関係管理や開発サーバー・ビルドの運用の経験あり。',
			en: 'I have experience with dependency management using npm and operating development servers and builds.'
		},
		group: 'Tools',
		url: 'https://nodejs.org/',
		urltext: 'Node.js Official Site',
		color: 'nodejs'
	},
	{
		id: 'vscode',
		logo: '',
		name: 'VS Code',
		level: {
			ja: '中級',
			en: 'intermediate'
		},
		description: {
			ja: '日常的に使用しているエディタ。',
			en: 'Editor I use daily.'
		},
		group: 'Tools',
		url: 'https://code.visualstudio.com/',
		urltext: 'Visual Studio Code Official Site',
		color: 'vscode'
	},
	{
		id: 'typst',
		logo: '',
		name: 'Typst',
		level: {
			ja: '中級',
			en: 'intermediate'
		},
		description: {
			ja: '日常的にドキュメント作成ツールとして使用している。',
			en: 'Used as a document creation tool daily.'
		},
		group: 'Tools',
		url: 'https://typst.app/',
		urltext: 'Typst Official Site',
		color: 'typst'
	},
	{
		id: 'github',
		logo: '',
		name: 'GitHub',
		level: {
			ja: '初級',
			en: 'beginner'
		},
		description: {
			ja: '日常的にプロジェクトの管理に使用している。',
			en: 'Used for managing projects daily.'
		},
		group: 'Tools',
		url: 'https://github.com/',
		urltext: 'GitHub Official Site',
		color: 'github'
	},
	{
		id: 'docker',
		logo: '',
		name: 'Docker',
		level: {
			ja: '入門レベル',
			en: 'introductory'
		},
		description: {
			ja: 'コンテナ技術の基本的な理解と使用経験あり。',
			en: 'Basic understanding and experience using container technology.'
		},
		group: 'Tools',
		url: 'https://www.docker.com/',
		urltext: 'Docker Official Site',
		color: 'docker'
	}
];
