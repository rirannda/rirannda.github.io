import { browser } from '$app/environment';

class ThemeState {
	isDark = $state(true);

	constructor() {
		// ブラウザ環境でのみ実行
		if (browser) {
			// 保存されたテーマがあればそれを、なければOSの設定を読み込む
			const savedTheme = localStorage.getItem('theme');
			if (savedTheme) {
				this.isDark = savedTheme === 'dark';
			} else {
				this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			}
			this.applyTheme();
		}
	}

	setTheme(mode: 'light' | 'dark') {
		this.isDark = mode === 'dark';
		this.applyTheme();
	}

	toggle() {
		this.isDark = !this.isDark;
		this.applyTheme();
	}

	private applyTheme() {
		if (!browser) return;
		// htmlタグに 'dark' クラスを付け外しする
		if (this.isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}
}

export const theme = new ThemeState();
