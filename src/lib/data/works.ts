import portfolioScreenshot from '$lib/assets/works/PortfoliOS/screenshot_1.png';
import omuctNaviScreenshot1 from '$lib/assets/works/omuct-navi/screenshot_1.png';
import omuctNaviScreenshot2 from '$lib/assets/works/omuct-navi/screenshot_2.png';
import omuctNaviScreenshot3 from '$lib/assets/works/omuct-navi/screenshot_3.png';
import omuctNaviScreenshot4 from '$lib/assets/works/omuct-navi/screenshot_4.png';
import typHlScreenshot from '$lib/assets/works/typ-hl/screenshot_1.png';
import colabPokerScreenshot1 from '$lib/assets/works/colab-poker/screenshot_1.png';
import colabPokerScreenshot2 from '$lib/assets/works/colab-poker/screenshot_2.png';
import colabPokerScreenshot3 from '$lib/assets/works/colab-poker/screenshot_3.png';
import colabPokerScreenshot4 from '$lib/assets/works/colab-poker/screenshot_4.png';
import type { TechId } from './techs';

export type LocalizedText = { ja: string; en: string };

export type Work = {
	id: string;
	name: string;
	images?: string[]; // import したスクリーンショットの URL
	description: LocalizedText;
	role?: LocalizedText;
	highlights?: LocalizedText;
	demoUrl?: string;
	tech: TechId[];
	repoUrl: string;
	isFeatured: boolean; // trueのものはトップページにも表示する
};

export const worksData: Work[] = [
	{
		id: 'portfolio-os',
		name: 'PortfoliOS',
		images: [portfolioScreenshot],
		description: {
			ja: '本ポートフォリオサイト。Svelte5で実装。 コマンドラインから実際にサイト内を操作できるギミックを搭載しました。',
			en: 'This is my portfolio website. Implemented with Svelte5. It features a gimmick that allows you to operate the site from the command line.'
		},
		tech: ['svelte', 'tailwind', 'typescript'],
		repoUrl: 'https://github.com/rirannda/portfolio',
		isFeatured: true
	},
	{
		id: 'omuct-navi',
		name: 'OMUCT-NAVI',
		images: [
			omuctNaviScreenshot1,
			omuctNaviScreenshot2,
			omuctNaviScreenshot3,
			omuctNaviScreenshot4
		],
		description: {
			ja: '総合課題実習1の!MSチームとして作成した校内案内アプリ。マップの作成とUI周りを担当しました。独自に作成したマップと地理データをLeaflet.jsを用いてマップにしています。A*アルゴリズムを用いてルートを探査、そのルートに基づいて案内します。高専祭当日の発表用に2026年度高専祭のデータを作成し、来場者が使えるようにしました。',
			en: 'A campus navigation app developed by the !MS team as part of Comprehensive Project Practice 1. The app uses Leaflet.js to visualize custom-made maps and geographic data. It implements the A* pathfinding algorithm to calculate routes and provide navigation guidance. For the publicly available web version, we created a dataset for the 2026 Kosen Festival, allowing visitors to navigate the campus.'
		},
		tech: ['leaflet', 'svelte', 'typescript'],
		repoUrl: 'https://github.com/u0021u004Du0053/omuct-navi',
		isFeatured: true
	},
	{
		id: 'typ-hl',
		name: 'typ-hl',
		images: [typHlScreenshot],
		description: {
			ja: 'Typstのコードブロックを拡張するライブラリ',
			en: 'A typst library for extending code blocks'
		},
		tech: ['typst'],
		repoUrl: 'https://github.com/rirannda/typ-hl',
		isFeatured: true
	},
	{
		id: 'colab-poker',
		name: 'colab-poker',
		images: [
			colabPokerScreenshot1,
			colabPokerScreenshot2,
			colabPokerScreenshot3,
			colabPokerScreenshot4
		],
		description: {
			ja: 'Google Colabを用いて作成したJupyter環境で動作するポーカーゲーム。 GithubのREADMEにあるリンクからGoogle Colab環境で遊ぶことができます。',
			en: 'A poker game that runs in a Jupyter environment built using Google Colab. You can play the game directly in Google Colab by following the link provided in the GitHub README.'
		},
		tech: ['python'],
		repoUrl: 'https://github.com/rirannda/colab-poker',
		isFeatured: true
	},
	{
		id: 'monakime',
		name: 'MonakIME',
		images: [], // 画像追加後に import したスクリーンショットを指定
		description: {
			ja: 'Linuxのfcitx5向けに開発中の日本語IME。Mozcによるライブ変換と、CPUで動作するZenzモデルによる変換候補の追加を組み合わせています。主要な処理をRust、fcitx5・llama.cppとの接続部分をC++で実装しています。',
			en: 'An experimental Japanese IME for fcitx5 on Linux. It combines Mozc live conversion with additional conversion candidates from a Zenz model running on the CPU. Core logic is implemented in Rust, with C++ adapters for fcitx5 and llama.cpp.'
		},
		tech: ['rust', 'cpp'],
		repoUrl: 'https://github.com/rirannda/MonakIME',
		isFeatured: true
	}
];
