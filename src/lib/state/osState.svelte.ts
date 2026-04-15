class OSState {
    theme = $state<'dark' | 'light'>('dark');
    isBooting = $state<boolean>(true);
    isRebooting = $state<boolean>(false);

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
    }

    setBooting(status: boolean) {
        this.isBooting = status;
    }

    setRebooting(status: boolean) {
        this.isRebooting = status;
    }
}

export const os = new OSState();