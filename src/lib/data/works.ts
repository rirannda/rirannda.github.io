export type Work = {
    id: string;
    name: string;
    images: string[];     // スクリーンショットのパス
    description: string;
    tech: { color: string; label: string }[]
    repoUrl: string;
    isFeatured: boolean; // trueのものはトップページにも表示する
};

export const worksData: Work[] = [
    {
        id: 'portfolio-os',
        name: 'PortfoliOS',
        images: ['/images/portfolio.png'],
        description: '本ポートフォリオサイト。Svelte5で実装。コマンドラインから実際にサイト内を操作できるギミックを搭載しました。',
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
        images: ['/images/app-a.png'],
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
        images: ['/images/tool-b.png'],
        description: 'Pythonで作った便利なスクリプト。',
        tech: [
            { color: 'python', label: ' Python' }
        ],
        repoUrl: 'https://github.com/rirannda/tool-b',
        isFeatured: false
    }
];