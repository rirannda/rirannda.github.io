<script lang="ts">
	import type { Skill } from '$lib/data/skills';
	import { getTech } from '$lib/data/techs';
	import TechIcon from './TechIcon.svelte';
	import { langState } from '$lib/state/langState.svelte';

	let { skill }: { skill: Skill } = $props();

	const tech = $derived(getTech(skill.id));
	const currentLevel = $derived(skill.level[langState.current]);
	const currentDescription = $derived(skill.description[langState.current]);

	const progressWidth = $derived(
		currentLevel === '上級' || currentLevel === 'advanced'
			? '100%'
			: currentLevel === '中級' || currentLevel === 'intermediate'
				? '66%'
				: currentLevel === '初級' || currentLevel === 'beginner'
					? '33%'
					: '10%'
	);

	const progressColor = $derived(
		currentLevel === '上級' || currentLevel === 'advanced'
			? 'bg-green-500'
			: currentLevel === '中級' || currentLevel === 'intermediate'
				? 'bg-blue-500'
				: 'bg-gray-400'
	);

	let dialogElement: HTMLDialogElement;

	function openModal() {
		// ネイティブの showModal() を呼ぶと、自動で背景がロックされフォーカスが閉じ込められます
		dialogElement.showModal();
	}

	function closeModal(e?: Event) {
		if (e) e.stopPropagation();
		dialogElement.close();
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === dialogElement) {
			closeModal();
		}
	}
</script>

<button
	class="skill-card group rounded-lg border-gray-300 bg-white/50 p-2.5 backdrop-blur-sm md:p-5 dark:border-gray-700 dark:bg-black/20 flex w-full cursor-pointer flex-col border text-left outline-0 transition-all"
	style:--tech-color={tech.color}
	onclick={openModal}
>
	<div class="mb-4 gap-1 md:gap-4 flex items-center">
		<span class="skill-heading pr-2 text-2xl md:pr-0 md:text-4xl transition-colors">
			<TechIcon icon={tech.icon} />
		</span>
		<h3 class="skill-heading font-mono text-lg font-bold md:text-xl transition-colors">
			{tech.label}
		</h3>
	</div>

	<div class="mb-2 bg-gray-200 dark:bg-gray-800 w-full overflow-hidden rounded-full">
		<div
			class="h-2 ease-out rounded-full transition-all duration-1000 {progressColor}"
			style="width: {progressWidth};"
		></div>
	</div>
	<div class="font-mono text-xs text-right opacity-70">{currentLevel}</div>
</button>

<dialog
	bind:this={dialogElement}
	onclick={handleBackdropClick}
	aria-labelledby="skill-modal-title"
	class="max-w-md rounded-xl border-gray-300 bg-gray-100 text-darktext p-6 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm dark:border-gray-700 dark:text-lighttext m-auto w-full border transition-transform dark:bg-[#111111]"
>
	<button
		type="button"
		class="right-4 top-4 text-2xl text-gray-500 hover:text-black dark:hover:text-white font-hack absolute cursor-pointer outline-0 transition-colors"
		onclick={closeModal}
		aria-label="Close modal"
	>
		
	</button>

	<div class="mb-6 gap-4 flex items-center">
		<span class="text-6xl" style:color={tech.color}><TechIcon icon={tech.icon} /></span>
		<div class="pl-2">
			<h3 id="skill-modal-title" class="mb-1 text-2xl font-bold">
				{tech.label}
			</h3>
			<span class="rounded px-2 py-1 text-xs font-semibold text-white inline-block {progressColor}">
				{currentLevel}
			</span>
		</div>
	</div>

	<p class="mb-8 leading-relaxed md:text-base opacity-90">
		{currentDescription}
	</p>

	<a
		href={skill.url}
		target="_blank"
		rel="noopener noreferrer external"
		class="rounded border-gray-400 px-4 py-2 font-mono text-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-800 block w-full border text-center transition-colors"
	>
		{skill.urltext}
	</a>
</dialog>

<style>
	.skill-card:hover,
	.skill-card:focus-visible {
		border-color: var(--tech-color);
	}

	.skill-card:hover .skill-heading,
	.skill-card:focus-visible .skill-heading {
		color: var(--tech-color);
	}
</style>
