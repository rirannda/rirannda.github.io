export type Work = {
    id: string;
    name: string;
    image: string;     // スクリーンショットのパス
    description: string;
    tech: { color: string; label: string }[]
    repoUrl: string;
    isFeatured: boolean; // trueのものはトップページにも表示する
};

export const worksData: Work[] = [
    {
        id: 'portfolio-os',
        name: 'PortfoliOS',
        image: '/images/portfolio.png',
        description: 'SvelteKitとTailwind CSSで構築したCUI風のポートフォリオサイト。',
        tech: [
            { color: 'svelte', label: ' Svelte' },
            { color: 'tailwind', label: '󱏿 Tailwind CSS' },
            { color: 'typescript', label: ' TypeScript' }
        ],
        repoUrl: 'https://github.com/rirannda/portfolio',
        isFeatured: true
    },
    {
        id: 'app-a',
        name: 'Awesome App A',
        image: '/images/app-a.png',
        description: 'Reactで作ったすごいアプリ。',
        tech: [
            { color: 'react', label: ' React' },
            { color: 'typescript', label: ' TypeScript' }
        ],
        repoUrl: 'https://github.com/rirannda/app-a',
        isFeatured: true
    },
    {
        id: 'tool-b',
        name: 'Convenient Tool B',
        image: '/images/tool-b.png',
        description: 'Pythonで作った便利なスクリプト。',
        tech: [
            { color: 'python', label: ' Python' }
        ],
        repoUrl: 'https://github.com/rirannda/tool-b',
        isFeatured: false
    }
];