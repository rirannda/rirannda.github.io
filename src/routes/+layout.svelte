<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import RebootScreen from '$lib/components/RebootScreen.svelte';
	import BootingScreen from '$lib/components/BootingScreen.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { os } from '$lib/state/osState.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();
	onMount(() => {
		os.setBooting(true);
		os.setRebooting(false);
	});
</script>

<svelte:head>
	<meta name="description" content="PortfoliOS - O.M.U.C.T. Student, Rirannda's portfolio" />
	<meta property="og:title" content="Rirannda Portfolio" />
	<meta
		property="og:description"
		content="Svelte5製ポートフォリオサイト。ターミナル操作ギミック搭載。"
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if os.isBooting}
	<BootingScreen />
{:else if os.isRebooting}
	<RebootScreen />
{:else}
	<div class="flex min-h-screen flex-col">
		<Header />
		<main>
			{@render children()}
			<Footer />
		</main>
		<Terminal />
	</div>
{/if}
