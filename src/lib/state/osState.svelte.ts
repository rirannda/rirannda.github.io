class OSState {
	isBooting = $state<boolean>(true);
	isRebooting = $state<boolean>(false);

	setBooting(status: boolean) {
		this.isBooting = status;
	}

	setRebooting(status: boolean) {
		this.isRebooting = status;
	}
}

export const os = new OSState();
