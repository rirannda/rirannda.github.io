<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { terminal } from '$lib/state/terminalState.svelte';
	import { theme } from '$lib/state/themeState.svelte';

	const currentPrompt = $derived(
		'visitor@PortfoliOS:~/portfolio' +
			(terminal.currentPath == '/' ? '' : terminal.currentPath) +
			' $ '
	);
	const compactPrompt = $derived.by(() => {
		const path = terminal.currentPath === '/' ? '/top' : terminal.currentPath;
		const last = path.split('/').filter(Boolean).pop() ?? 'top';
		return ` ...${last == 'top' ? 'portfolio/' : '/' + last} $ cd top`;
	});

	function toggleTheme() {
		theme.toggle();
	}

	let menuOpen = $state(false);

	let innerWidth = $state(1024);
	const isNarrow = $derived(innerWidth < 420);

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
	class="border-b-archlinux fixed z-50 flex w-full items-center justify-center border-b-3 bg-[#333333] p-5 py-5 text-white transition-colors duration-300 md:h-max md:w-full md:p-5 md:py-5"
>
	<a
		href={resolve('/')}
		aria-label="GotoTop"
		class="ml-1 min-w-0 flex-1 truncate pr-2 font-mono md:mr-auto md:ml-5 md:pr-4"
	>
		{isNarrow ? compactPrompt : `${currentPrompt} cd ~/portfolio/top`}
		<span id="cursor" class="animate-blink ml-1 bg-white px-1"></span>
	</a>

	<nav class="mr-5 ml-auto hidden items-center gap-6 md:flex" aria-label="Global navigation">
		{#each links as link (link.id)}
			<a
				href={resolve(`/#${link.id}`)}
				class="before:bg-archlinux relative inline-block transition-colors before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:content-[''] hover:text-white/80 hover:before:scale-x-100"
				class:font-bold={isActiveLink(link.id)}>{link.label}</a
			>
		{/each}
	</nav>

	<button
		type="button"
		onclick={toggleTheme}
		class="border-archlinux hidden rounded-xl border py-1 pr-2.5 pl-1.5 text-center font-[NerdFont] whitespace-pre outline-0 md:inline md:py-2 md:pr-4.5 md:pl-3.5"
	>
		{theme.isDark ? '  Light' : '  Dark'}
	</button>

	<button
		class="relative ml-2 h-6 w-7 shrink-0 md:ml-10 md:h-9 md:w-11"
		aria-label="Toggle menu"
		aria-expanded={menuOpen}
		aria-controls="mobile-menu"
		onclick={toggleMenu}
	>
		<span
			class={`absolute top-0 left-0 h-1 w-7 rounded-4xl bg-gray-300 transition-transform duration-200 md:h-1.5 md:w-11 ${
				menuOpen ? 'translate-y-2.5 rotate-45 md:translate-y-3.5' : ''
			}`}
		></span>
		<span
			class="absolute top-2.5 left-0 h-1 w-7 rounded-4xl bg-gray-300 transition-opacity duration-200 md:top-3.5 md:h-1.5 md:w-11"
			class:opacity-0={menuOpen}
		></span>
		<span
			class={`absolute top-5 left-0 h-1 w-7 rounded-4xl bg-gray-300 transition-transform duration-200 md:top-7 md:h-1.5 md:w-11 ${
				menuOpen ? '-translate-y-2.5 -rotate-45 md:-translate-y-3.5' : ''
			}`}
		></span>
	</button>

	{#if menuOpen}
		<nav
			id="mobile-menu"
			class="border-b-archlinux absolute top-full left-0 z-10 mt-0.75 flex w-full flex-col items-center border-b-2 bg-[#333333]/95 p-4 transition-all"
			aria-label="Mobile navigation"
		>
			{#each links as link (link.id)}
				<a
					href={resolve(`/#${link.id}`)}
					onclick={closeMenu}
					class="rounded px-2 py-2 transition-colors hover:bg-[#1E1E1E]"
					class:font-bold={isActiveLink(link.id)}>{link.label}</a
				>
			{/each}
			<div class="flex md:hidden">
				<button
					type="button"
					onclick={toggleTheme}
					class="border-archlinux mt-1 rounded-xl border py-1 pr-2.5 pl-1.5 text-center font-[NerdFont] whitespace-pre outline-0"
				>
					{theme.isDark ? '  Light' : '  Dark'}
				</button>
			</div>
		</nav>
	{/if}
</header>
