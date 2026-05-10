import { browser } from '$app/environment';

class LangState {
	current = $state<'ja' | 'en'>('ja');
	toggle() {
		this.current = this.current === 'ja' ? 'en' : 'ja';
		if (browser) {
			document.documentElement.lang = this.current;
		}
	}
}
export const langState = new LangState();
