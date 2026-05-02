class LangState {
	current = $state<'ja' | 'en'>('ja');
	toggle() {
		this.current = this.current === 'ja' ? 'en' : 'ja';
	}
}
export const langState = new LangState();
