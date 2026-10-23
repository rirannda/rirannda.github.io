export type LocalizedText = { ja: string; en: string };

export type Work = {
	id: string;
	name: string;
	images?: string[]; // スクリーンショットのパス
	description: LocalizedText;
	role?: LocalizedText;
	highlights?: LocalizedText;
	demoUrl?: string;
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
			ja: '本ポートフォリオサイト。Svelte5で実装。 コマンドラインから実際にサイト内を操作できるギミックを搭載しました。',
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
		id: 'colab-poker',
		name: 'colab-poker',
		images: [
			'/images/colab-poker/screenshot_1.png',
			'/images/colab-poker/screenshot_2.png',
			'/images/colab-poker/screenshot_3.png',
			'/images/colab-poker/screenshot_4.png'
		],
		description: {
			ja: 'Google Colabを用いて作成したJupyter環境で動作するポーカーゲーム。 GithubのREADMEにあるリンクからGoogle Colab環境で遊ぶことができます。',
			en: 'A poker game that runs in a Jupyter environment built using Google Colab. You can play the game directly in Google Colab by following the link provided in the GitHub README.'
		},
		tech: [{ bg: 'python', textColor: 'python-dark', label: ' Python' }],
		repoUrl: 'https://github.com/rirannda/colab-poker',
		isFeatured: true
	},
	{
		id: 'monakime',
		name: 'MonakIME',
		images: [], // 画像追加後に '/images/MonakIME/screenshot_1.png' などを指定
		description: {
			ja: 'Linuxのfcitx5向けに開発中の日本語IME。Mozcによるライブ変換と、CPUで動作するZenzモデルによる変換候補の追加を組み合わせています。主要な処理をRust、fcitx5・llama.cppとの接続部分をC++で実装しています。',
			en: 'An experimental Japanese IME for fcitx5 on Linux. It combines Mozc live conversion with additional conversion candidates from a Zenz model running on the CPU. Core logic is implemented in Rust, with C++ adapters for fcitx5 and llama.cpp.'
		},
		tech: [
			{ bg: 'rust', textColor: 'lighttext', label: ' Rust' },
			{ bg: 'cpp', textColor: 'lighttext', label: ' C++' }
		],
		repoUrl: 'https://github.com/rirannda/MonakIME',
		isFeatured: true
	}
];
