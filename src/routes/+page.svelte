<script lang="ts">
	import { onMount } from 'svelte';
	import { terminal } from '$lib/state/terminalState.svelte';
	import { fade } from 'svelte/transition';
	import { worksData } from '$lib/data/works';
	import { resolve } from '$app/paths';
	import { skillsData } from '$lib/data/skills';
	import WorkCard from '$lib/components/WorkCard.svelte';
	import SkillCard from '$lib/components/SkillCard.svelte';

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

	const skillFilters = ['All', 'Language', 'Framework & Library', 'Tools', 'Others'];

	let activeSkillFilter = $state('All');

	const filteredSkills = $derived(
		activeSkillFilter === 'All'
			? skillsData
			: activeSkillFilter === 'Framework & Library'
				? skillsData.filter((skill) => skill.group === 'Framework' || skill.group === 'Library')
				: skillsData.filter((skill) => skill.group === activeSkillFilter)
	);

	const parts = ['rg24010r', 'st', 'omu', 'ac', 'jp'];
	const email = `${parts[0] + '@' + parts[1] + '.' + parts[2] + '.' + parts[3] + '.' + parts[4]}`;
	let copyStatus = $state('');
	function copyMail() {
		navigator.clipboard.writeText(email).then(
			() => {
				copyStatus = ': Copying successful.';
			},
			() => {
				copyStatus = ': Copy failed.';
			}
		);
	}

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
	class="gap-10 md:px-10 px-5 pt-30 md:max-w-3/5 mx-auto max-w-screen flex-col justify-center text-left align-baseline"
>
	<section id="top" class="mb-55 scroll-mt-31 pt-40 md:mb-75 md:pt-50">
		<p class="font-mono text-xl text-green-600 dark:text-green-400">Hi, my name is</p>
		<h1 class="text-6xl font-bold md:my-3 md:text-9xl">Rirannda</h1>
		<p class="my-3 text-4xl">O.M.U.C.T. Student.</p>
		{#if quoteVisible}
			<p
				class="py-5 font-serif text-2xl text-black dark:text-lighttext/70 italic transition-opacity duration-200"
				transition:fade
			>
				{currentQuote}
			</p>
		{/if}
		<div class="pt-5">
			<a
				class="mb-4 rounded-2xl border-amber-600 bg-amber-600/10 px-5 py-4 text-lg font-bold hover:bg-amber-600/85 md:mr-3 md:inline block w-fit border font-[NerdFont] transition-all duration-150"
				href="#featured"
			>
				View projects 
			</a>
			<a
				class="bg-archlinux/10 border-archlinux hover:bg-archlinux/95 rounded-2xl px-5 py-4 text-lg font-bold md:inline block w-fit border font-[NerdFont] transition-all duration-150"
				href="#contact"
			>
				Contact me
			</a>
		</div>
	</section>
	<section id="about" class="scroll-mt-31 pb-5">
		<h2 class="mb-4 border-green-500 text-4xl font-bold md:text-5xl border-b">About Me</h2>
		<div class="md:px-6 flex">
			<span class="w-1 bg-green-500 text-green-500 h-auto rounded-full">|</span>
			<div class="px-2 py-1 md:ml-1 flex-col">
				<p class="text-xl md:inline hidden w-fit">
					大阪公立大学工業高等専門学校 知能情報コース/ 2年生
				</p>
				<p class="text-xl md:hidden w-fit">大阪公立大学工業高等専門学校</p>
				<p class="text-xl md:hidden w-fit">知能情報コース/ 2年生</p>
				<p class="text-xl w-fit">学友会執行部 所属</p>
			</div>
		</div>

		<div class="pt-2 text-lg md:p-2">
			<p class="py-0.5">知能情報コースでAIなどの最新技術や実践的なプログラミングを学んでいます。</p>
			<p class="py-0.5">学友会執行部ではWeb開発に関わりつつ行事の企画・運営に携わっています。</p>
			<p class="py-0.5">
				また、プライベートではLinux環境(特にArch
				Linux)を愛用しており、ターミナル作業の効率化などを楽しんでいます。
			</p>
		</div>
	</section>
	<section id="featured" class="mb-5 scroll-mt-21 pb-10">
		<h2 class="mb-4 border-green-500 text-4xl font-bold md:text-5xl border-b">Featured-Projects</h2>
		<p class="text-lg">取り組んできたプロジェクトの一部です。</p>
		<div class="my-6 gap-6 md:grid-cols-2 grid grid-cols-1 flex-col">
			{#each featuredWorks as work, i (i)}
				<WorkCard {work} />
			{/each}
		</div>
		<a
			href={resolve('/works')}
			class="rounded border-green-500 bg-green-500/10 px-4 py-3 hover:bg-green-500/85 border"
			>すべてのプロジェクトを見る</a
		>
	</section>
	<section id="skills" class="scroll-mt-21 pb-5">
		<h2 class="mb-4 border-green-500 text-4xl font-bold md:text-5xl border-b">Skills</h2>
		<p class="text-lg">現在までに習得した技術スタック</p>
		<p class="ml-2 font-mono text-gray-700 dark:text-gray-300 italic">
			クリックすると詳細が見られます。
		</p>
		<div class="my-6 gap-3 md:px-2 flex flex-wrap">
			{#each skillFilters as filter, i (i)}
				<button
					onclick={() => (activeSkillFilter = filter)}
					class={`md:px-4 px-2 md:py-1 font-mono font-bold cursor-pointer rounded-full  border transition-all duration-300 ${
						activeSkillFilter === filter
							? 'border-green-500 bg-green-500 text-black dark:text-[#0c0c0c]' // 選択中
							: 'border-gray-500 text-gray-600 hover:border-green-500 hover:text-green-500 dark:text-gray-400' // 非選択
					} outline-0`}
				>
					<spa class="md:text-lg"
						>{filter === 'All'
							? ''
							: filter === 'Language'
								? ''
								: filter === 'Framework & Library'
									? ''
									: filter === 'Tools'
										? ''
										: ''}</spa
					>
					{filter}
				</button>
			{/each}
		</div>

		<div class="pt-2 text-lg md:p-2">
			<div
				class="md:gap-8 gap-3 rounded border-gray-700 p-4 md:grid-cols-4 dark:border-gray-500 grid grid-cols-2 border"
			>
				{#each filteredSkills as skill (skill.id)}
					<SkillCard {skill} />
				{/each}
			</div>
		</div>
	</section>
	<section id="contact" class="scroll-mt-21 pb-5">
		<h2 class="mb-4 border-green-500 text-4xl font-bold md:text-5xl border-b">Contact Me</h2>
		<div class="pt-2 text-lg md:p-2">
			<div class="flex" id="email">
				<span class="md:text-xl text-lg font-bold px-1">
					<span class="pr-2 font-[NerdFont]"></span>
					Email :
				</span>
				<span class="md:px-2">rg24010r [at] st.omu.ac.jp</span>
				<button
					class="md:ml-5 bg-archlinux/10 border-archlinux hover:bg-archlinux/95 rounded-xl font-bold px-2 py-0.5 font-mono md:block hidden w-fit border outline-0 transition-all duration-150"
					onclick={copyMail}
				>
					Copy
				</button>
				<span class="md:ml-2 font-bold md:inline hidden">{copyStatus}</span>
			</div>
			<div class="md:hidden my-2 flex">
				<button
					class="md:ml-5 bg-archlinux/10 border-archlinux hover:bg-archlinux/95 rounded-xl font-bold px-2 py-0.5 font-mono block w-fit border outline-0 transition-all duration-150"
					onclick={copyMail}
				>
					Copy
				</button>
				<span class="ml-2 font-bold">{copyStatus}</span>
			</div>
			<div class="text-xl flex" id="accounts">
				<a
					href="https://github.com/rirannda"
					class="px-3 rounded-2xl md:mx-2 bg-github/10 border-github hover:bg-github/95 py-1 text-lg font-bold md:inline block w-fit border font-[NerdFont] transition-all duration-150"
					target="_blank"
					rel="external"
				>
					<span class="pr-1 text-2xl font-[NerdFont]"></span>
					rirannda
				</a>
			</div>
		</div>
	</section>
</div>
