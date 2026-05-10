<script lang="ts">
	import { onMount } from 'svelte';
	import { terminal } from '$lib/state/terminalState.svelte';
	import { worksData } from '$lib/data/works';
	import WorkCard from '$lib/components/WorkCard.svelte';
	import { langState } from '$lib/state/langState.svelte';
	import { dict } from '$lib/i18n/dict';

	const t = $derived(dict[langState.current]);

	onMount(() => {
		const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));

		const setCurrentPath = (id: string) => {
			terminal.currentPath = id === 'top' ? '/' : `/${id}`;
		};

		const handleScroll = () => {
			const isAtBottom =
				window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

			if (isAtBottom) {
				const lastSection = sections.at(-1);
				if (lastSection) {
					setCurrentPath(lastSection.id);
				}
			}
		};

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					// セクションが画面の半分以上を占めたらアクティブとみなす
					if (entry.isIntersecting) {
						setCurrentPath(entry.target.id);
					}
				});
			},
			{
				// 画面の中央付近で検知するように調整
				threshold: 0,

				rootMargin: '-50% 0px -50% 0px'
			}
		);

		sections.forEach((section) => observer.observe(section));
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>PortfoliOS - Works | Rirannda's Portfolio</title>
	<meta property="og:url" content="https://rirannda.github.io/works" />
</svelte:head>

<div
	class="gap-10 px-10 pt-30 md:max-w-3/5 mx-auto max-w-screen flex-col justify-center text-left align-baseline"
>
	<section id="works" class="scroll-mt-30 pb-5">
		<h2 class="mb-4 border-green-500 text-4xl font-bold md:text-5xl border-b">Works</h2>
		<p>
			{t.works.desc}
		</p>
		<div class="my-6 gap-6 md:grid-cols-2 grid grid-cols-1 flex-col">
			{#each worksData as work, i (i)}
				<WorkCard {work} />
			{/each}
		</div>
	</section>
</div>
