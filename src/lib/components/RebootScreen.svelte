<script lang="ts">
	import { resolve } from '$app/paths';
	import { os } from '$lib/state/osState.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const rebootMessages = [
		'[ OK ] Stopped svelte.service.',
		'[ OK ] Stopped typescript.service.',
		'[ OK ] Stopped portfolio.service.',
		'[ OK ] Unmounted /home.',
		'[ OK ] Reached target Unmount All Filesystems.',
		'[ OK ] Reached target Shutdown.',
		'[ OK ] Started Reboot.',
		' ',
		'Rebooting PortfolioOS v1.0.0 ...'
	];

	let visibleLines = $state<string[]>([]);
	let intervalId: ReturnType<typeof setInterval> | undefined;
	let messageTimeoutId: ReturnType<typeof setTimeout> | undefined;
	let rebootTimeoutId: ReturnType<typeof setTimeout> | undefined;
	let hasFinished = false;

	function clearTimers() {
		clearInterval(intervalId);
		clearTimeout(messageTimeoutId);
		clearTimeout(rebootTimeoutId);
	}

	function finishReboot() {
		if (hasFinished) return;
		hasFinished = true;
		clearTimers();
		sessionStorage.removeItem('hasBooted');
		window.location.href = resolve('/');
	}

	// コンポーネントが表示された時に、少しずつ文字を出していく
	onMount(() => {
		let currentIndex = 0;
		intervalId = setInterval(() => {
			if (currentIndex < rebootMessages.length - 1) {
				visibleLines.push(rebootMessages[currentIndex]);
				currentIndex++;
			} else if (currentIndex === rebootMessages.length - 1) {
				// 最後のメッセージだけ0.3秒待ってから表示
				clearInterval(intervalId);
				messageTimeoutId = setTimeout(() => {
					visibleLines.push(rebootMessages[rebootMessages.length - 1]);
				}, 300);
				currentIndex++;
				rebootTimeoutId = setTimeout(finishReboot, 1500);
			}
		}, 250);

		return () => {
			clearTimers();
			os.setRebooting(false);
		};
	});
</script>

<button
	type="button"
	aria-label="Skip reboot sequence"
	onclick={finishReboot}
	in:fade|global={{ duration: 400 }}
	class="inset-0 bg-black p-6 font-mono text-white focus-visible:outline-white fixed z-9999 flex cursor-pointer flex-col text-left focus-visible:outline-2 focus-visible:-outline-offset-4"
>
	{#each visibleLines as line, i (i)}
		<span class="whitespace-pre">{line}</span>
	{/each}
	<span class="mt-2 h-4 w-2 bg-white"></span>
</button>
