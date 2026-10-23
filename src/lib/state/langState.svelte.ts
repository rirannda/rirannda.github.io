import { browser } from '$app/environment';

class LangState {
	current = $state<'ja' | 'en'>('ja');
	setLanguage(language: 'ja' | 'en') {
		this.current = language;
		if (browser) {
			document.documentElement.lang = language;
		}
	}

	toggle() {
		this.setLanguage(this.current === 'ja' ? 'en' : 'ja');
	}
}
export const langState = new LangState();
