export type Work = {
	id: string;
	name: string;
	images?: string[]; // スクリーンショットのパス
	description: {
		ja: string;
		en: string;
	};
	tech: { bg: string; textColor: string; label: string }[];
	repoUrl: string;
	isFeatured: boolean; // trueのものはトップページにも表示する
};

export const worksData: Work[] = [
	{
		id: 'portfolio-os',
		name: 'PortfoliOS',
		images: ['/images/PortfoliOS/screenshot_1.png'],
		description: {
			ja: '本ポートフォリオサイト。Svelte5で実装。コマンドラインから実際にサイト内を操作できるギミックを搭載しました。',
			en: 'This is my portfolio website. Implemented with Svelte5. It features a gimmick that allows you to operate the site from the command line.'
		},
		tech: [
			{ bg: 'svelte', textColor: 'lighttext', label: ' Svelte' },
			{ bg: 'tailwind', textColor: 'lighttext', label: '󱏿 Tailwind CSS' },
			{ bg: 'typescript', textColor: 'lighttext', label: ' TypeScript' }
		],
		repoUrl: 'https://github.com/rirannda/portfolio',
		isFeatured: true
	},
	{
		id: 'typ-hl',
		name: 'typ-hl',
		images: ['/images/typ-hl/screenshot_1.png'],
		description: {
			ja: 'Typstのコードブロックを拡張するライブラリ',
			en: 'A typst library for extending code blocks'
		},
		tech: [{ bg: 'typst', textColor: 'lighttext', label: ' Typst' }],
		repoUrl: 'https://github.com/rirannda/typ-hl',
		isFeatured: true
	},
	{
		id: 'tool-b',
		name: 'Convenient Tool B',
		images: [
			/*'/images/tool-b.png'*/
		],
		description: {
			ja: 'Pythonで作った便利なスクリプト。',
			en: 'A convenient script created with Python.'
		},
		tech: [{ bg: 'python', textColor: 'python-dark', label: ' Python' }],
		repoUrl: 'https://github.com/rirannda/tool-b',
		isFeatured: false
	}
];
