<script lang="ts">
	import { os } from '$lib/state/osState.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const bootMessages = [
		"  Booting `PortfolioOS Folix'",
		' ',
		'Tips: You can skip this messages with click or tap.',
		' ',
		'Loading Kernel Folix ...',
		'Loading Framework Svelte5 ...',
		'Loading Framework SvelteKit ...',
		'Loading Styles TailwindCSS ...',
		'Loading My Portfolio ...'
	];

	let visibleLines = $state<string[]>([]);
	let intervalId: ReturnType<typeof setInterval> | undefined;
	let welcomeTimeoutId: ReturnType<typeof setTimeout> | undefined;
	let finishTimeoutId: ReturnType<typeof setTimeout> | undefined;
	let hasFinished = false;

	function clearTimers() {
		clearInterval(intervalId);
		clearTimeout(welcomeTimeoutId);
		clearTimeout(finishTimeoutId);
	}

	function finishBoot() {
		if (hasFinished) return;
		hasFinished = true;
		clearTimers();
		os.setBooting(false);
	}

	// コンポーネントが表示された時に、少しずつ文字を出していく
	onMount(() => {
		let currentIndex = 0;
		intervalId = setInterval(() => {
			if (currentIndex < bootMessages.length) {
				visibleLines.push(bootMessages[currentIndex]);
				currentIndex++;
			} else {
				clearInterval(intervalId);
				visibleLines.push('Loading ...');
				visibleLines.push(' ');

				welcomeTimeoutId = setTimeout(() => {
					visibleLines.push('Welcome to my portfolio!');
					visibleLines.push(' ');
					visibleLines.push('wait 5s or click to turn in...');
					// 最後のメッセージを表示してから5秒後にメイン画面へ
					finishTimeoutId = setTimeout(finishBoot, 5000);
				}, 600);
			}
		}, 350);

		return clearTimers;
	});
</script>

<button
	type="button"
	aria-label="Skip boot sequence"
	onclick={finishBoot}
	out:fade|global={{ duration: 400 }}
	class="inset-0 bg-black p-6 font-mono text-white focus-visible:outline-white fixed z-9999 flex cursor-pointer flex-col text-left whitespace-pre focus-visible:outline-2 focus-visible:-outline-offset-4"
>
	{#each visibleLines as line, i (i)}
		<span>{line}</span>
	{/each}
</button>
