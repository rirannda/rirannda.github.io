<script lang="ts">
	import { resolve } from '$app/paths';
	import { os } from '$lib/state/osState.svelte';
	import { onMount } from 'svelte';
	// 本物っぽい起動ログの配列
	const rebootMessages = [
		'[ OK ] Stopped svelte.service.',
		'[ OK ] Stopped typescript.service.',
		'[ OK ] Stopped portfolio.service.',
		'[ OK ] Unmounted /home.',
		'[ OK ] Reached target Unmount All Filesystems.',
		'[ OK ] Reached target Shutdown.',
		'[ OK ] Started Reboot.',
		' ',
		'Rebooting PortfolioOS v0.0.0 ...'
	];

	let visibleLines = $state<string[]>([]);

	// コンポーネントが表示された時に、少しずつ文字を出していく
	onMount(() => {
		let currentIndex = 0;
		let timeoutId: ReturnType<typeof setTimeout> | null = null;
		const interval = setInterval(() => {
			if (currentIndex < rebootMessages.length - 1) {
				visibleLines.push(rebootMessages[currentIndex]);
				currentIndex++;
			} else if (currentIndex === rebootMessages.length - 1) {
				// 最後のメッセージだけ0.3秒待ってから表示
				clearInterval(interval);
				timeoutId = setTimeout(() => {
					visibleLines.push(rebootMessages[rebootMessages.length - 1]);
					visibleLines = visibleLines;
				}, 300);
				currentIndex++;
				setTimeout(async () => {
					window.location.href = resolve('/'); // 再起動の演出としてリロードしてトップに遷移
				}, 1500);
			}
		}, 150); // 0.15秒ごとに次の行を表示（お好みで調整）

		return () => {
			clearInterval(interval);
			if (timeoutId) clearTimeout(timeoutId);
			os.setRebooting(false);
		};
	});
</script>

<div class="inset-0 bg-black p-6 font-mono text-white fixed z-9999 flex flex-col">
	{#each visibleLines as line, i (i)}
		<div class="whitespace-pre">{line}</div>
	{/each}
	<div class="mt-2 h-4 w-2 bg-white"></div>
</div>
