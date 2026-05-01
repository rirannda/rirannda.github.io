<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { terminal } from '$lib/state/terminalState.svelte';
	import { theme } from '$lib/state/themeState.svelte';
	import { langState, toggleLang } from '$lib/state/langState.svelte';

	let innerWidth = $state(1024);
	const isNarrow = $derived(innerWidth < 420);

	const defaultPrompt = $derived([
		'visitor@PortfoliOS',
		':',
		`~/portfolio${terminal.currentPath == '/' ? '' : terminal.currentPath}`,
		'$ cd ~/portfolio/top'
	]);

	const compactPrompt = $derived.by(() => {
		const path = terminal.currentPath === '/' ? '/top' : terminal.currentPath;
		const last = path.split('/').filter(Boolean).pop() ?? 'top';
		return ['...', last == 'top' ? '/portfolio' : '/portfolio/' + last, '$ cd top'];
	});

	function toggleTheme() {
		theme.toggle();
	}

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	const links = [
		{ id: 'top', label: 'Home' },
		{ id: 'about', label: 'About' },
		{ id: 'featured', label: 'Featured' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'contact', label: 'Contact' }
	] as const;

	function isActiveLink(id: (typeof links)[number]['id']) {
		if (id === 'top') {
			return page.url.hash === '' || page.url.hash === '#top';
		}

		return page.url.hash === `#${id}`;
	}
</script>

<svelte:window bind:innerWidth />

<header
	class="border-b-archlinux p-5 py-5 text-white md:h-max md:w-full md:p-5 md:py-5 fixed z-50 flex w-full items-center justify-center border-b-3 bg-[#333333] transition-colors duration-300"
>
	<a
		href={resolve('/')}
		aria-label="GotoTop"
		class="ml-1 min-w-0 pr-2 md:text-lg font-mono md:mr-auto md:ml-5 md:pr-4 flex grow truncate outline-0"
	>
		{#if isNarrow}
			<span>{compactPrompt[0]}</span>
			<span class="text-vscode font-bold">{compactPrompt[1]}</span>
			<span class="font-bold">{compactPrompt[2]}</span>
		{:else}
			<span class="text-green-400 font-bold">{defaultPrompt[0]}</span>
			<span>{defaultPrompt[1]}</span>
			<span class="text-vscode font-bold">{defaultPrompt[2]}</span>
			<span>{defaultPrompt[3]}</span>
		{/if}
		<span id="cursor" class="animate-blink ml-2 bg-white pr-1 pl-1.5 font-normal h-6 align-middle"
		></span>
	</a>

	<nav class="mr-5 gap-6 md:flex ml-auto hidden items-center" aria-label="Global navigation">
		{#each links as link (link.id)}
			<a
				href={resolve(`/#${link.id}`)}
				class="before:bg-archlinux before:bottom-0 before:left-0 before:h-0.5 hover:text-white/80 relative inline-block outline-0 transition-colors before:absolute before:w-full before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:content-[''] hover:before:scale-x-100"
				class:font-bold={isActiveLink(link.id)}>{link.label}</a
			>
		{/each}
	</nav>

	<button
		type="button"
		onclick={toggleTheme}
		class="border-archlinux rounded-xl py-1 pr-2.5 pl-1.5 md:inline md:py-2 md:pr-4.5 md:pl-3.5 md:ml-10 hidden border text-center font-[NerdFont] whitespace-pre outline-0"
	>
		{theme.isDark ? '  Light' : '  Dark'}
	</button>

	<button
		type="button"
		onclick={toggleLang}
		class="border-archlinux rounded-xl py-1 pr-2.5 pl-1.5 md:inline md:py-1.5 md:px-3 md:ml-3 font-bold hidden border text-center whitespace-pre outline-0"
	>
		<span class="pr-3 text-lg font-normal font-[NerdFont]"></span>{langState.current === 'ja'
			? 'EN'
			: 'JP'}
	</button>

	<button
		class="ml-2 h-6 w-7 md:ml-10 md:h-9 md:w-11 relative shrink-0 outline-0"
		aria-label="Toggle menu"
		aria-expanded={menuOpen}
		aria-controls="mobile-menu"
		onclick={toggleMenu}
	>
		<span
			class={`top-0 left-0 h-1 w-7 rounded-4xl bg-gray-300 md:h-1.5 md:w-11 absolute transition-transform duration-200 ${
				menuOpen ? 'translate-y-2.5 md:translate-y-3.5 rotate-45' : ''
			}`}
		></span>
		<span
			class="top-2.5 left-0 h-1 w-7 rounded-4xl bg-gray-300 md:top-3.5 md:h-1.5 md:w-11 absolute transition-opacity duration-200"
			class:opacity-0={menuOpen}
		></span>
		<span
			class={`top-5 left-0 h-1 w-7 rounded-4xl bg-gray-300 md:top-7 md:h-1.5 md:w-11 absolute transition-transform duration-200 ${
				menuOpen ? '-translate-y-2.5 md:-translate-y-3.5 -rotate-45' : ''
			}`}
		></span>
	</button>

	{#if menuOpen}
		<nav
			id="mobile-menu"
			class="border-b-archlinux left-0 mt-0.75 p-4 absolute top-full z-10 flex w-full flex-col items-center border-b-2 bg-[#333333]/95 transition-all"
			aria-label="Mobile navigation"
		>
			{#each links as link (link.id)}
				<a
					href={resolve(`/#${link.id}`)}
					onclick={closeMenu}
					class="rounded px-2 py-2 outline-0 transition-colors hover:bg-[#1E1E1E]"
					class:font-bold={isActiveLink(link.id)}>{link.label}</a
				>
			{/each}
			<div class="md:hidden flex">
				<button
					type="button"
					onclick={toggleTheme}
					class="border-archlinux mt-1 rounded-xl py-1 pr-2.5 pl-1.5 border text-center font-[NerdFont] whitespace-pre outline-0"
				>
					{theme.isDark ? '  Light' : '  Dark'}
				</button>
			</div>
			<div class="md:hidden mt-1 flex">
				<button
					type="button"
					onclick={toggleLang}
					class="border-archlinux mt-1 rounded-xl py-1 pr-2.5 pl-1.5 border text-center font-[NerdFont] whitespace-pre outline-0"
				>
					<span class="pr-3 text-lg font-normal font-[NerdFont]"></span>{langState.current === 'ja'
						? 'EN'
						: 'JP'}
				</button>
			</div>
		</nav>
	{/if}
</header>
