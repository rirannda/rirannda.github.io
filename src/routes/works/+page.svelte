<script lang="ts">
	import { onMount } from 'svelte';
	import { terminal } from '$lib/state/terminalState.svelte';
	import { worksData } from '$lib/data/works';
	import WorkCard from '$lib/components/WorkCard.svelte';

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

<div
	class="mx-auto max-w-screen flex-col justify-center gap-10 px-10 pt-30 text-left align-baseline md:max-w-3/5"
>
	<section id="works" class="scroll-mt-30 pb-5">
		<h2 class="mb-4 border-b border-green-500 text-4xl font-bold md:text-5xl">Works</h2>
		<p>
			完成したプロジェクトに加え、現在進行中の取り組みも掲載しています。
			継続的な改善と学習を通して、より良いアウトプットを目指しています。
		</p>
		<div class="my-6 grid grid-cols-1 flex-col gap-6 md:grid-cols-2">
			{#each worksData as work, i (i)}
				<WorkCard {work} />
			{/each}
		</div>
	</section>
</div>
