import { browser } from '$app/environment';

const storageType = 'sessionStorage';

function getStorage() {
	if (!browser) return null;
	return storageType === 'sessionStorage' ? sessionStorage : localStorage;
}

class OSState {
	isBooting = $state<boolean>(false);
	isRebooting = $state<boolean>(false);
	private initialized = false;

	// クライアントマウント時に一度だけ呼ぶ。sessionStorage からフラグを読み、初回のみ起動演出を有効にする。
	init() {
		if (!browser || this.initialized) return;
		this.initialized = true;
		const hasBooted = !!getStorage()?.getItem('hasBooted');
		this.isBooting = !hasBooted;
	}

	setBooting(status: boolean) {
		this.isBooting = status;
		if (browser && status === false) {
			getStorage()?.setItem('hasBooted', 'true');
			console.log(`[OS] Boot sequence finished. Flag saved to ${storageType}.`);
		}
	}

	setRebooting(status: boolean) {
		this.isRebooting = status;
	}
}

export const os = new OSState();
