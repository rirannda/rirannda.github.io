import type { TechId } from './techs';

export type Skill = {
	id: TechId;
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
};

export const skillsData: Skill[] = [
	{
		id: 'html',
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
		urltext: 'MDN Web Docs - HTML'
	},
	{
		id: 'typescript',
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
		urltext: 'TypeScript Official Site'
	},
	{
		id: 'javascript',
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
		urltext: 'MDN Web Docs - JavaScript'
	},
	{
		id: 'css',
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
		urltext: 'MDN Web Docs - CSS'
	},
	{
		id: 'python',
		level: {
			ja: '初級',
			en: 'beginner'
		},
		description: {
			ja: '実習や簡単なスクリプト作成に使用経験あり。',
			en: 'I have experience using it in practical training and simple script creation.'
		},
		group: 'Language',
		url: 'https://www.python.org/',
		urltext: 'Python Official Site'
	},
	{
		id: 'arduino',
		level: {
			ja: '入門レベル',
			en: 'introductory'
		},
		description: {
			ja: '実習で使用経験あり。',
			en: 'Experienced in using it during practical training '
		},
		group: 'Language',
		url: 'https://docs.arduino.cc/language-reference/',
		urltext: 'Arduino language-reference'
	},
	{
		id: 'rust',
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
		urltext: 'Rust Official Site'
	},
	{
		id: 'cpp',
		level: {
			ja: '入門レベル',
			en: 'introductory'
		},
		description: {
			ja: '鋭意学習中。',
			en: 'Currently studying intensively.'
		},
		group: 'Language',
		url: 'https://learn.microsoft.com/ja-jp/cpp/cpp/cpp-language-reference',
		urltext: 'MicroSoft C++ Reference'
	},
	{
		id: 'svelte',
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
		urltext: 'Svelte Official Site'
	},
	{
		id: 'react',
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
		urltext: 'React Official Site'
	},
	{
		id: 'git',
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
		urltext: 'Git Official Site'
	},
	{
		id: 'nodejs',
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
		urltext: 'Node.js Official Site'
	},
	{
		id: 'vscode',
		level: {
			ja: '中級',
			en: 'intermediate'
		},
		description: {
			ja: '日常的に使用しているエディタ。',
			en: 'Editor I used daily.'
		},
		group: 'Tools',
		url: 'https://code.visualstudio.com/',
		urltext: 'Visual Studio Code Official Site'
	},
	{
		id: 'typst',
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
		urltext: 'Typst Official Site'
	},
	{
		id: 'github',
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
		urltext: 'GitHub Official Site'
	},
	{
		id: 'docker',
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
		urltext: 'Docker Official Site'
	}
];
