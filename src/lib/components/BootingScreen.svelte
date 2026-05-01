<script lang="ts">
	import { os } from '$lib/state/osState.svelte';
	// 本物っぽい起動ログの配列
	const bootMessages = [
		"  Booting `PortfolioOS Folix'",
		' ',
		'Loading Kernel Folix ...',
		'Loading My Portfolio ...'
	];

	let visibleLines = $state<string[]>([]);

	// コンポーネントが表示された時に、少しずつ文字を出していく
	$effect(() => {
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
				}, 750);
				// (再起動中じゃない＝初回起動時のみ、自動で終了させる)
				if (!os.isRebooting) {
					setTimeout(() => {
						os.setBooting(false);
					}, 1900);
				}
			}
		}, 250); // 0.25秒ごとに次の行を表示（お好みで調整）

		return () => clearInterval(interval);
	});
</script>

<div class="inset-0 bg-black p-6 font-mono text-white fixed z-9999 flex flex-col">
	{#each visibleLines as line, i (i)}
		<div class="whitespace-pre">{line}</div>
	{/each}
	<div class="mt-2 h-4 w-2 bg-white"></div>
</div>
