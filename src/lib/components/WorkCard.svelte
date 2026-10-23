<script lang="ts">
	import { onMount } from 'svelte';
	import type { Work } from '$lib/data/works';
	import { langState } from '$lib/state/langState.svelte';
	import { dict } from '$lib/i18n/dict';

	let { work }: { work: Work } = $props();

	const currentDescription = $derived(work.description[langState.current]);
	const t = $derived(dict[langState.current].workCard);

	let currentIndex = $state(0);
	let isPaused = $state(false);
	const focusStyle =
		'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-archlinux';

	onMount(() => {
		isPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	$effect(() => {
		const imageCount = work.images?.length ?? 0;
		if (imageCount <= 1 || isPaused) return;
		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % imageCount;
		}, 3000);
		return () => clearInterval(interval);
	});

	function changeImage(direction: number) {
		const count = work.images?.length ?? 0;
		if (!count) return;
		isPaused = true;
		currentIndex = (currentIndex + direction + count) % count;
	}
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
					aria-hidden={i !== currentIndex}
					loading="lazy"
					width="640"
					height="360"
					class={`inset-0 absolute h-full w-full object-cover transition-opacity duration-1000 ${
						i === currentIndex ? 'opacity-100' : 'opacity-0'
					}`}
				/>
			{/each}
		</div>
		{#if work.images.length > 1}
			<div
				class="mb-3 gap-3 px-3 text-sm flex flex-wrap items-center justify-center"
				role="group"
				aria-label={`${work.name}: ${t.images}`}
			>
				<button
					type="button"
					aria-label={t.previous}
					onclick={() => changeImage(-1)}
					class={`rounded border-gray-400 px-3 py-1 cursor-pointer border ${focusStyle}`}>←</button
				>
				<span aria-live={isPaused ? 'polite' : 'off'}
					>{currentIndex + 1} / {work.images.length}</span
				>
				<button
					type="button"
					aria-label={t.next}
					onclick={() => changeImage(1)}
					class={`rounded border-gray-400 px-3 py-1 cursor-pointer border ${focusStyle}`}>→</button
				>
				<button
					type="button"
					onclick={() => (isPaused = !isPaused)}
					class={`rounded border-gray-400 px-3 py-1 cursor-pointer border ${focusStyle}`}
					>{isPaused ? t.play : t.pause}</button
				>
			</div>
		{/if}
	{/if}
	<div class="px-5 py-2 flex flex-col">
		<h3 class="mb-3 text-2xl font-bold transition-colors">
			{work.name}
		</h3>

		<p class="mb-4 text-lg grow opacity-80">
			{currentDescription}
		</p>
		{#if work.role || work.highlights}
			<dl class="mb-4 space-y-3">
				{#if work.role}
					<div>
						<dt class="font-bold">{t.role}</dt>
						<dd class="mt-1 opacity-80">{work.role[langState.current]}</dd>
					</div>
				{/if}
				{#if work.highlights}
					<div>
						<dt class="font-bold">{t.highlights}</dt>
						<dd class="mt-1 opacity-80">{work.highlights[langState.current]}</dd>
					</div>
				{/if}
			</dl>
		{/if}
	</div>
	<div class="my-2 px-3 mt-auto flex flex-col opacity-90">
		<div class="px-2">
			{#each work.tech as tech, i (i)}
				<span
					class={`bg-${tech.bg} mx-1 md:px-2 px-2 my-1 md:py-1 font-hack inline-block w-fit dark:text-${tech.textColor} text-${tech.textColor} rounded-full`}
				>
					{tech.label}
				</span>
			{/each}
		</div>
		<a
			href={work.repoUrl}
			target="_blank"
			rel="noopener noreferrer external"
			class={`rounded border-gray-400 px-5 md:px-15 mx-5 py-2 my-4 font-mono hover:bg-gray-100 dark:hover:bg-gray-800 mt-8 inline-block w-3/4 self-center border text-center transition-colors ${focusStyle}`}
		>
			<span class="text-xl font-hack"></span> View on GitHub
		</a>
		{#if work.demoUrl}
			<a
				href={work.demoUrl}
				target="_blank"
				rel="noopener noreferrer external"
				class={`mx-5 mb-4 rounded border-archlinux px-5 py-2 font-mono hover:bg-archlinux/15 w-3/4 self-center border text-center transition-colors ${focusStyle}`}
				>{t.demo}</a
			>
		{/if}
	</div>
</div>
