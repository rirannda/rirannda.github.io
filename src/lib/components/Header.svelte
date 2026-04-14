<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	const currentPrompt = $derived(
		'visitor@Folix: ~/portfolio' + (page.url.pathname == '/' ? '' : page.url.pathname) + '$ '
	);

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/skills', label: 'Skills' }
	] as const;
</script>

<header class="relative flex items-center bg-blue-900 p-4 py-7 text-white">
	<a href={resolve('/')} aria-label="GotoTop" class="truncate pr-4 font-mono">{currentPrompt}</a>
	<!--トップにジャンプ機能(未実装)-->

	<nav class="ml-auto hidden items-center gap-6 md:flex" aria-label="Global navigation">
		{#each links as link (link.href)}
			<a
				href={resolve(link.href)}
				class="transition-opacity hover:opacity-80"
				class:font-bold={page.url.pathname === link.href}>{link.label}</a
			>
		{/each}
	</nav>

	<button
		class="relative ml-auto h-11 w-14 shrink-0 md:hidden"
		aria-label="Toggle menu"
		aria-expanded={menuOpen}
		aria-controls="mobile-menu"
		onclick={toggleMenu}
	>
		<span
			class="absolute top-0 left-0 h-2 w-14 rounded-4xl bg-white transition-transform duration-200"
			class:translate-y-4.5={menuOpen}
			class:rotate-45={menuOpen}
		></span>
		<span
			class="absolute top-4.5 left-0 h-2 w-14 rounded-4xl bg-white transition-opacity duration-200"
			class:opacity-0={menuOpen}
		></span>
		<span
			class="absolute top-9 left-0 h-2 w-14 rounded-4xl bg-white transition-transform duration-200"
			class:-translate-y-4.5={menuOpen}
			class:-rotate-45={menuOpen}
		></span>
	</button>

	{#if menuOpen}
		<nav
			id="mobile-menu"
			class="absolute top-full left-0 z-10 flex w-full flex-col bg-blue-950/95 p-4 md:hidden"
			aria-label="Mobile navigation"
		>
			{#each links as link (link.href)}
				<a
					href={resolve(link.href)}
					onclick={closeMenu}
					class="rounded px-2 py-3 transition-colors hover:bg-blue-800"
					class:font-bold={page.url.pathname === link.href}>{link.label}</a
				>
			{/each}
		</nav>
	{/if}
</header>
