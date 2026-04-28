<script lang="ts">
	import { onMount } from 'svelte';
	import { terminal } from '$lib/state/terminalState.svelte';
	import { fade } from 'svelte/transition';
	import { worksData } from '$lib/data/works';
	import { resolve } from '$app/paths';
	import { skillsData } from '$lib/data/skills';
	import WorkCard from '$lib/components/WorkCard.svelte';

	const quotes = [
		'Stay Hungry, Stay Foolish - Steve Jobs',
		'Keep It Simple Stupid - Kelly Johnson',
		'Talk is cheap. Show me the code. - Linus Torvalds'
	];

	let currentQuote = $state(quotes[0]);
	let quoteVisible = $state(true);

	function pickRandomQuote(previousQuote: string) {
		if (quotes.length === 1) return quotes[0];

		let nextQuote = previousQuote;
		while (nextQuote === previousQuote) {
			nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
		}

		return nextQuote;
	}

	async function cycleQuote() {
		quoteVisible = false;
		await new Promise((resolve) => setTimeout(resolve, 300));
		currentQuote = pickRandomQuote(currentQuote);
		quoteVisible = true;
	}

	const featuredWorks = worksData.filter((work) => work.isFeatured);

	onMount(() => {
		currentQuote = quotes[Math.floor(Math.random() * quotes.length)];

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

		const quoteInterval = setInterval(() => {
			cycleQuote();
		}, 4500);

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
			clearInterval(quoteInterval);
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	});
</script>

<div
	class="mx-auto max-w-screen flex-col justify-center gap-10 px-10 pt-30 text-left align-baseline md:max-w-3/5"
>
	<section id="top" class="mb-50 scroll-mt-31 pt-40 md:mb-75 md:pt-50">
		<p class="font-mono text-xl text-green-600 dark:text-green-400">Hi, my name is</p>
		<h1 class="text-6xl font-bold md:my-3 md:text-9xl">Rirannda</h1>
		<p class="my-3 text-4xl">O.M.U.C.T. Student.</p>
		{#if quoteVisible}
			<p
				class="text-gray-[#222222]/70 py-5 font-serif text-2xl italic transition-opacity duration-200 dark:text-[#e4e4e4]/70"
				transition:fade
			>
				{currentQuote}
			</p>
		{/if}
		<div class="pt-5">
			<a
				class="mb-4 block w-fit rounded-2xl border border-amber-600 bg-amber-600/10 px-5 py-4 font-[NerdFont] text-lg font-bold transition-all duration-150 hover:bg-amber-600/85 md:mr-3 md:inline"
				href="#featured"
			>
				View projects 
			</a>
			<a
				class="block w-fit rounded-2xl border border-[#08c] bg-[#08c]/10 px-5 py-4 font-[NerdFont] text-lg font-bold transition-all duration-150 hover:bg-[#08c]/95 md:inline"
				href="#contact"
			>
				Contact me
			</a>
		</div>
	</section>
	<section id="about" class="scroll-mt-31 pb-5">
		<h2 class="mb-4 border-b border-green-500 text-4xl font-bold md:text-5xl">About Me</h2>
		<div class="flex md:px-6">
			<span class="h-auto w-1 rounded-full bg-green-500 text-green-500">|</span>
			<div class="flex-col px-2 py-1 md:ml-1">
				<p class="hidden w-fit text-xl md:inline">
					大阪公立大学工業高等専門学校 知能情報コース 2年生
				</p>
				<p class="w-fit text-xl md:hidden">大阪公立大学工業高等専門学校</p>
				<p class="w-fit text-xl md:hidden">知能情報コース 2年生</p>
				<p class="w-fit text-xl">学友会執行部 所属</p>
			</div>
		</div>
		<div class="pt-2 text-lg md:p-2">
			<p>知能情報コースで...</p>
			<p>学友会執行部で...</p>
		</div>
	</section>
	<section id="featured" class="mb-5 scroll-mt-21 pb-10">
		<h2 class="mb-4 border-b border-green-500 text-4xl font-bold md:text-5xl">Featured-Projects</h2>
		<p class="text-lg">取り組んできたプロジェクトの一部です。</p>
		<div class="my-6 grid grid-cols-1 flex-col gap-6 md:grid-cols-2">
			{#each featuredWorks as work, i (i)}
				<WorkCard {work} />
			{/each}
		</div>
		<a
			href={resolve('/works')}
			class="rounded border border-green-500 bg-green-500/10 px-4 py-3 hover:bg-green-500/85"
			>すべてのプロジェクトを見る</a
		>
	</section>
	<section id="skills" class="scroll-mt-21 pb-5">
		<h2 class="mb-4 border-b border-green-500 text-4xl font-bold md:text-5xl">Skills</h2>
		<p class="text-lg">現在までに習得した技術スタック</p>
		<div class="pt-2 text-lg md:p-2">
			<div class="grid rounded border border-gray-700 p-4 dark:border-gray-500">
				{#each skillsData as skill, i (i)}
					<div>
						<div class="">{skill.logo}</div>
						<h3 class="text-2xl font-bold">{skill.name}</h3>
						<p class="mt-2 grow text-lg">{skill.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
	<section id="contact" class="scroll-mt-21 pb-5">
		<h2 class="mb-4 border-b border-green-500 text-4xl font-bold md:text-5xl">Contact</h2>
		<div class="pt-2 text-lg md:p-2">
			<p>contact</p>
			<p>contact</p>
			<p>contact</p>
			<p>contact</p>
			<p>contact</p>
			<p>contact</p>
			<p>contact</p>
			<p>contact</p>
			<p>contact</p>
			<p>contact</p>
			<p>contact</p>
		</div>
	</section>
</div>
