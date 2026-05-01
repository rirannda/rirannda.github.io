<script lang="ts">
	import { onMount } from 'svelte';
	import type { Work } from '$lib/data/works';

	let { work }: { work: Work } = $props();

	let currentIndex = $state(0);

	onMount(() => {
		// 画像が複数ある場合のみタイマーを起動
		if (work.images && work.images.length > 1) {
			const interval = setInterval(() => {
				currentIndex = (currentIndex + 1) % work.images.length;
			}, 3000); // 3000ミリ秒（3秒）ごとに切り替え

			return () => clearInterval(interval);
		}
	});
</script>

<div
	class="group hover:border-archlinux rounded-2xl border-gray-300 bg-white/50 backdrop-blur-sm dark:border-gray-700 dark:bg-black/20 z-20 flex flex-col overflow-hidden border transition-all"
>
	{#if work.images && work.images.length > 0}
		<div
			class="mb-4 aspect-video rounded bg-gray-200 dark:bg-gray-800 relative w-full overflow-hidden"
		>
			{#each work.images as img, i (i)}
				<img
					src={img}
					alt={`${work.name} screenshot ${i + 1}`}
					class={`inset-0 absolute h-full w-full object-cover transition-opacity duration-1000 ${
						i === currentIndex ? 'opacity-100' : 'opacity-0'
					}`}
				/>
			{/each}
		</div>
	{/if}
	<div class="px-5 py-2">
		<h3 class="mb-3 text-2xl font-bold transition-colors">
			{work.name}
		</h3>

		<p class="mb-4 text-lg grow opacity-80">
			{work.description}
		</p>

		<div class="my-2 row-3 opacity-90">
			{#each work.tech as tech, i (i)}
				<span
					class={`bg-${tech.bg} mx-1 md:px-2 px-2 my-1 md:py-1 font-mono md:inline inline-block dark:text-${tech.textColor} text-${tech.textColor} rounded-full`}
				>
					{tech.label}
				</span>
			{/each}
		</div>

		<div class="mt-auto">
			<a
				href={work.repoUrl}
				target="_blank"
				rel="noopener noreferrer external"
				class="mt-1 rounded border-gray-400 px-4 py-2 font-mono hover:bg-gray-100 dark:hover:bg-gray-800 inline-block w-full border text-center transition-colors"
			>
				<span class="text-xl"></span> View on GitHub
			</a>
		</div>
	</div>
</div>
