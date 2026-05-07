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
		images: [/*'/images/portfolio.png'*/],
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
		id: 'app-a',
		name: 'Awesome App A',
		images: [/*'/images/app-a.png'*/],
		description: {
			ja: 'Reactで作ったすごいアプリ。',
			en: 'An amazing app created with React.'
		},
		tech: [
			{ bg: 'react', textColor: 'lighttext', label: ' React' },
			{ bg: 'typescript', textColor: 'lighttext', label: ' TypeScript' }
		],
		repoUrl: 'https://github.com/rirannda/app-a',
		isFeatured: true
	},
	{
		id: 'tool-b',
		name: 'Convenient Tool B',
		images: [/*'/images/tool-b.png'*/],
		description: {
			ja: 'Pythonで作った便利なスクリプト。',
			en: 'A convenient script created with Python.'
		},
		tech: [{ bg: 'python', textColor: 'python-dark', label: ' Python' }],
		repoUrl: 'https://github.com/rirannda/tool-b',
		isFeatured: false
	}
];
