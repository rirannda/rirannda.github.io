<script lang="ts">
	import { os } from '$lib/state/osState.svelte';
	import { onMount } from 'svelte';
	// 本物っぽい起動ログの配列
	const bootMessages = [
		"  Booting `PortfolioOS Folix'",
		' ',
		'Loading Kernel Folix ...',
		'Loading Framework Svelte5 ...',
		'Loading Framework SvelteKit ...',
		'Loading Styles TailwindCSS ...',
		'Loading My Portfolio ...'
	];

	let visibleLines = $state<string[]>([]);

	// コンポーネントが表示された時に、少しずつ文字を出していく
	onMount(() => {
		let currentIndex = 0;
		const interval = setInterval(() => {
			if (currentIndex < bootMessages.length) {
				visibleLines.push(bootMessages[currentIndex]);
				currentIndex++;
			} else {
				clearInterval(interval);
				// 全てのメッセージが出終わったら、少し待ってからメイン画面へ
				visibleLines.push('Loading ...');
				visibleLines.push(' ');

				setTimeout(() => {
					visibleLines.push('Welcome to my portfolio!');
				}, 600);

				setTimeout(() => {
					os.setBooting(false);
				}, 2000);
			}
		}, 200);

		return () => clearInterval(interval);
	});
</script>

<div class="inset-0 bg-black p-6 font-mono text-white fixed z-9999 flex flex-col whitespace-pre">
	{#each visibleLines as line, i (i)}
		<div>{line}</div>
	{/each}
</div>
