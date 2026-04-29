export type Skill = {
    id: string;
    logo: string;
    name: string;
    level: '入門レベル' | '初級' | '中級' | '上級'; //'beginner' | 'intermediate' | 'advanced';
    description: string;
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
        level: '中級',
        description: '様々なプロジェクトで使用経験あり。',
        group: 'Language',
        url: 'https://developer.mozilla.org/ja/docs/Web/HTML',
        urltext: 'MDN Web Docs - HTML',
        color: 'html'
    },
    {
        id: 'typescript',
        logo: '',
        name: 'TypeScript',
        level: '中級',
        description: '本ポートフォリオをはじめ、ウェブ系の様々なプロジェクトで使用経験あり。',
        group: 'Language',
        url: 'https://www.typescriptlang.org/',
        urltext: 'TypeScript Official Site',
        color: 'typescript'
    },
    {
        id: 'javascript',
        logo: '',
        name: 'JavaScript',
        level: '中級',
        description: '様々なプロジェクトで使用経験あり。最近はTypeScriptを使用することが多い。',
        group: 'Language',
        url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript',
        urltext: 'MDN Web Docs - JavaScript',
        color: 'javascript'
    },
    {
        id: 'css',
        logo: '',
        name: 'CSS',
        level: '中級',
        description: '様々なプロジェクトで使用経験あり。',
        group: 'Language',
        url: 'https://developer.mozilla.org/ja/docs/Web/CSS',
        urltext: 'MDN Web Docs - CSS',
        color: 'css'
    },
    {
        id: 'python',
        logo: '',
        name: 'Python',
        level: '初級',
        description: '実習や簡単なスクリプト作成に使用経験あり。',
        group: 'Language',
        url: 'https://www.python.org/',
        urltext: 'Python Official Site',
        color: 'python'
    },
    {
        id: 'rust',
        logo: '',
        name: 'Rust',
        level: '入門レベル',
        description: '鋭意学習中。',
        group: 'Language',
        url: 'https://www.rust-lang.org/',
        urltext: 'Rust Official Site',
        color: 'rust'
    },
    {
        id: 'svelte',
        logo: '',
        name: 'Svelte',
        level: '中級',
        description: '本ポートフォリオサイトの開発などに使用。',
        group: 'Framework',
        url: 'https://svelte.jp/',
        urltext: 'Svelte Official Site',
        color: 'svelte'
    },
    {
        id: 'react',
        logo: '',
        name: 'React',
        level: '中級',
        description: '以前のプロジェクトで使用経験あり。',
        group: 'Library',
        url: 'https://ja.react.dev/',
        urltext: 'React Official Site',
        color: 'react'
    },
    {
        id: 'git',
        logo: '',
        name: 'Git',
        level: '中級',
        description: 'バージョン管理ツールとして日常的に使用。',
        group: 'Tools',
        url: 'https://git-scm.com/',
        urltext: 'Git Official Site',
        color: 'git'
    },
    {
        id: 'nodejs',
        logo: '',
        name: 'Node.js',
        level: '初級',
        description: 'npmを用いた依存関係管理や開発サーバー・ビルドの運用の経験あり。',
        group: 'Tools',
        url: 'https://nodejs.org/',
        urltext: 'Node.js Official Site',
        color: 'nodejs'
    },
    {
        id: 'vscode',
        logo: '',
        name: 'VS Code',
        level: '中級',
        description: '日常的に使用しているエディタ。',
        group: 'Tools',
        url: 'https://code.visualstudio.com/',
        urltext: 'Visual Studio Code Official Site',
        color: 'vscode'
    },
    {
        id: 'typst',
        logo: '',
        name: 'Typst',
        level: '中級',
        description: '日常的にドキュメント作成ツールとして使用している。',
        group: 'Tools',
        url: 'https://typst.app/',
        urltext: 'Typst Official Site',
        color: 'typst'
    },
    {
        id: 'github',
        logo: '',
        name: 'GitHub',
        level: '初級',
        description: '日常的にプロジェクトの管理に使用している。',
        group: 'Tools',
        url: 'https://github.com/',
        urltext: 'GitHub Official Site',
        color: 'github'
    },
    {
        id: 'docker',
        logo: '',
        name: 'Docker',
        level: '入門レベル',
        description: 'コンテナ技術の基本的な理解と使用経験あり。',
        group: 'Tools',
        url: 'https://www.docker.com/',
        urltext: 'Docker Official Site',
        color: 'docker'
    }
]