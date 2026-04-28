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

			// コンポーネントが破棄される時にタイマーを止める（メモリリーク防止）
			return () => clearInterval(interval);
		}
	});
</script>

<div
	class="group z-20 flex flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white/50 backdrop-blur-sm transition-all hover:border-[#08c] dark:border-gray-700 dark:bg-black/20"
>
	{#if work.images && work.images.length > 0}
		<div
			class="relative mb-4 aspect-video w-full overflow-hidden rounded bg-gray-200 dark:bg-gray-800"
		>
			{#each work.images as img, i (i)}
				<img
					src={img}
					alt={`${work.name} screenshot ${i + 1}`}
					class={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
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

		<p class="mb-4 grow text-lg opacity-80">
			{work.description}
		</p>

		<div class="row-3 my-2 opacity-90">
			{#each work.tech as tech, i (i)}
				<span
					class={`bg-${tech.color} mx-1 rounded-full px-2 py-1 font-mono  text-gray-700 dark:text-[#e4e4e4] `}
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
				class="mt-1 inline-block w-full rounded border border-gray-400 px-4 py-2 text-center font-mono transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
			>
				<span class="text-xl"></span> View on GitHub
			</a>
		</div>
	</div>
</div>
<!--<div class="grid rounded border border-gray-700 p-4 dark:border-gray-500">
					<img src={work.image} alt={`Screenshot of ${work.name}`} />
					<div class="row-2">
						<h3 class="text-2xl font-bold">{work.name}</h3>
						<p class="mt-2 grow text-lg">{work.description}</p>
					</div>
					<div class="row-3 my-2">
						{#each work.tech as tech, i (i)}
							<span
								class={`bg-${tech.color} mx-1 rounded-full px-2 py-1 font-mono text-lg  text-gray-700 dark:text-[#e4e4e4] `}
							>
								{tech.label}
							</span>
						{/each}
					</div>
					<a
						href={work.repoUrl}
						target="_blank"
						class="row-4 mt-2 flex h-10 items-center justify-center rounded border px-2 pr-3 font-[NerdFont] hover:shadow hover:shadow-white/90"
						rel="noreferrer noopener external"
						><span class="py-1 pr-3 text-2xl"></span>View on GitHub</a
					>
				</div>-->
