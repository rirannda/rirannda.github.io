<script lang="ts">
	import type { Skill } from '$lib/data/skills';
	import { langState } from '$lib/state/langState.svelte';
	let { skill }: { skill: Skill } = $props();

	type SkillColorKey =
		| 'undefined'
		| 'html'
		| 'typescript'
		| 'javascript'
		| 'css'
		| 'python'
		| 'rust'
		| 'svelte'
		| 'react'
		| 'git'
		| 'nodejs'
		| 'windows'
		| 'linux'
		| 'archlinux'
		| 'vscode'
		| 'typst'
		| 'github'
		| 'docker'
		| 'tailwind';

	const colorClasses: Record<
		SkillColorKey,
		{ hoverBorder: string; hoverText: string; text: string }
	> = {
		undefined: {
			hoverBorder: 'hover:border-undefined',
			hoverText: 'group-hover:text-undefined',
			text: 'text-undefined'
		},
		html: {
			hoverBorder: 'hover:border-html',
			hoverText: 'group-hover:text-html',
			text: 'text-html'
		},
		typescript: {
			hoverBorder: 'hover:border-typescript',
			hoverText: 'group-hover:text-typescript',
			text: 'text-typescript'
		},
		javascript: {
			hoverBorder: 'hover:border-javascript',
			hoverText: 'group-hover:text-javascript',
			text: 'text-javascript'
		},
		css: {
			hoverBorder: 'hover:border-css',
			hoverText: 'group-hover:text-css',
			text: 'text-css'
		},
		python: {
			hoverBorder: 'hover:border-python',
			hoverText: 'group-hover:text-python',
			text: 'text-python'
		},
		rust: {
			hoverBorder: 'hover:border-rust',
			hoverText: 'group-hover:text-rust',
			text: 'text-rust'
		},
		svelte: {
			hoverBorder: 'hover:border-svelte',
			hoverText: 'group-hover:text-svelte',
			text: 'text-svelte'
		},
		react: {
			hoverBorder: 'hover:border-react',
			hoverText: 'group-hover:text-react',
			text: 'text-react'
		},
		git: {
			hoverBorder: 'hover:border-git',
			hoverText: 'group-hover:text-git',
			text: 'text-git'
		},
		nodejs: {
			hoverBorder: 'hover:border-nodejs',
			hoverText: 'group-hover:text-nodejs',
			text: 'text-nodejs'
		},
		windows: {
			hoverBorder: 'hover:border-windows',
			hoverText: 'group-hover:text-windows',
			text: 'text-windows'
		},
		linux: {
			hoverBorder: 'hover:border-linux',
			hoverText: 'group-hover:text-linux',
			text: 'text-linux'
		},
		archlinux: {
			hoverBorder: 'hover:border-archlinux',
			hoverText: 'group-hover:text-archlinux',
			text: 'text-archlinux'
		},
		vscode: {
			hoverBorder: 'hover:border-vscode',
			hoverText: 'group-hover:text-vscode',
			text: 'text-vscode'
		},
		typst: {
			hoverBorder: 'hover:border-typst',
			hoverText: 'group-hover:text-typst',
			text: 'text-typst'
		},
		github: {
			hoverBorder: 'hover:border-github',
			hoverText: 'group-hover:text-github',
			text: 'text-github'
		},
		docker: {
			hoverBorder: 'hover:border-docker',
			hoverText: 'group-hover:text-docker',
			text: 'text-docker'
		},
		tailwind: {
			hoverBorder: 'hover:border-tailwind',
			hoverText: 'group-hover:text-tailwind',
			text: 'text-tailwind'
		}
	};

	const skillColors = $derived(
		colorClasses[skill.color as SkillColorKey] ?? colorClasses.undefined
	);
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

	// モーダルの開閉状態
	let isModalOpen = $state(false);

	function openModal() {
		isModalOpen = true;
	}

	function closeModal(e?: Event) {
		if (e) e.stopPropagation();
		isModalOpen = false;
	}

	// ウィンドウ全体のキーボード操作を監視する関数
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isModalOpen) {
			closeModal();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<button
	class={`group rounded-lg border-gray-300 bg-white/50 md:p-5 p-2.5 backdrop-blur-sm flex w-full cursor-pointer flex-col border text-left outline-0 transition-all ${skillColors.hoverBorder} dark:border-gray-700 dark:bg-black/20`}
	onclick={openModal}
>
	<div class="mb-4 md:gap-4 gap-1 flex items-center">
		<span
			class={`md:text-4xl text-2xl pr-2 md:pr-0 font-[NerdFont] transition-colors ${skillColors.hoverText}`}
			>{skill.logo}</span
		>
		<h3 class={`md:text-xl text-lg font-bold font-mono transition-colors ${skillColors.hoverText}`}>
			{skill.name}
		</h3>
	</div>

	<div class="mb-2 h-2 bg-gray-200 dark:bg-gray-800 w-full overflow-hidden rounded-full">
		<div
			class="h-2 rounded-full {progressColor} ease-out transition-all duration-1000"
			style="width: {progressWidth};"
		></div>
	</div>
	<div class="font-mono text-xs text-right opacity-70">{currentLevel}</div>
</button>

{#if isModalOpen}
	<div class="inset-0 p-4 fixed z-100 flex items-center justify-center">
		<button
			type="button"
			class="inset-0 bg-black/60 backdrop-blur-sm absolute"
			onclick={closeModal}
			aria-label="Close modal"
		></button>

		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="skill-modal-title"
			class="max-w-md rounded-xl border-gray-300 bg-gray-100 p-6 shadow-2xl dark:border-gray-700 relative z-10 w-full transform border transition-transform dark:bg-[#111111]"
		>
			<button
				type="button"
				class="top-4 right-4 text-2xl text-gray-500 hover:text-black dark:hover:text-white absolute cursor-pointer font-[NerdFont] transition-colors"
				onclick={closeModal}
				aria-label="Close modal"
			>
				
			</button>

			<div class="mb-6 gap-4 flex items-center">
				<span class={`text-6xl font-[NerdFont] ${skillColors.text}`}>{skill.logo}</span>
				<div class="pl-2">
					<h3 id="skill-modal-title" class="mb-1 text-2xl font-bold">{skill.name}</h3>
					<span
						class="rounded px-2 py-1 text-xs font-semibold text-white inline-block {progressColor}"
					>
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
		</div>
	</div>
{/if}
