<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import { terminal, type TerminalLine } from '$lib/state/terminalState.svelte';
	import { availableDirs, availableCommands, parseCommand } from '$lib/terminal/parser';
	import { worksData } from '$lib/data/works';
	import { skillsData } from '$lib/data/skills';
	import { langState } from '$lib/state/langState.svelte';
	import { dict } from '$lib/i18n/dict';

	let inputValue = $state('');
	let historyIndex = $state(-1);
	let inputDraft = $state('');
	let isRunning = $state(false);
	let innerWidth = $state(1024);
	let viewportHeight = $state(768);
	let keyboardOffset = $state(0);
	let commandInput = $state<HTMLInputElement>();
	let launcherButton = $state<HTMLButtonElement>();
	let outputViewport = $state<HTMLDivElement>();
	let wasOpen = false;

	const t = $derived(dict[langState.current].terminal);
	const currentPrompt = $derived(
		`visitor@PortfoliOS:~/portfolio${terminal.currentPath === '/' ? '' : terminal.currentPath} $ `
	);
	const compactPrompt = $derived(`...${terminal.currentPath} $ `);
	const latest = $derived(terminal.output.at(-1));
	const visibleLines = $derived(
		terminal.isHistoryOpened ? terminal.output : latest ? [latest] : []
	);
	const examples = ['help', 'ls projects', 'ls skills', 'cat about.txt'];
	const fileNames = [
		'about.txt',
		...worksData.map((work) => work.id),
		...skillsData.map((skill) => skill.id)
	];
	const focusStyle =
		'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-archlinux';

	$effect(() => {
		const isOpen = terminal.isTerminalEnabled;
		if (isOpen) {
			void tick().then(() => commandInput?.focus({ preventScroll: true }));
		} else if (wasOpen) {
			void tick().then(() => launcherButton?.focus({ preventScroll: true }));
		}
		wasOpen = isOpen;
	});

	$effect(() => {
		if (terminal.isTerminalEnabled && (terminal.output.length || terminal.isHistoryOpened)) {
			void tick().then(() => {
				if (outputViewport) outputViewport.scrollTop = outputViewport.scrollHeight;
			});
		}
	});

	onMount(() => {
		const viewport = window.visualViewport;
		const updateViewport = () => {
			viewportHeight = viewport?.height ?? window.innerHeight;
			keyboardOffset = viewport
				? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
				: 0;
		};
		updateViewport();
		viewport?.addEventListener('resize', updateViewport);
		viewport?.addEventListener('scroll', updateViewport);
		window.addEventListener('resize', updateViewport);
		return () => {
			viewport?.removeEventListener('resize', updateViewport);
			viewport?.removeEventListener('scroll', updateViewport);
			window.removeEventListener('resize', updateViewport);
		};
	});

	function formatLogPath(path: string) {
		if (innerWidth >= 640) return path;
		const prefix = 'visitor@PortfoliOS:~/portfolio';
		if (!path.startsWith(prefix)) return path;
		return `...${path.slice(prefix.length).replace(/\s*\$\s*$/, '') || '/'} $ `;
	}

	function closeTerminal() {
		terminal.isTerminalEnabled = false;
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (
			terminal.isTerminalEnabled &&
			event.key === 'Escape' &&
			!event.defaultPrevented &&
			!document.querySelector('dialog[open]')
		) {
			event.preventDefault();
			closeTerminal();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.isComposing) return;
		if (event.key === 'Tab') {
			if (event.shiftKey || !inputValue.trim()) return;
			event.preventDefault();
			const tokens = inputValue.split(/\s+/);
			if (tokens.length === 1) {
				const matches = availableCommands.filter((command) => command.startsWith(tokens[0]));
				if (matches.length === 1) inputValue = `${matches[0]} `;
			} else {
				const [command] = tokens;
				const prefix = tokens.at(-1) ?? '';
				let targets: string[] = [];
				if (tokens.length === 2) {
					if (command === 'cd' || command === 'ls') targets = availableDirs;
					else if (command === 'theme') targets = ['light', 'dark'];
					else if (command === 'lang') targets = ['ja', 'en'];
					else if (command === 'open')
						targets = ['github', 'discord', ...worksData.map((work) => work.id)];
				}
				if (command === 'cat') {
					targets = [
						...fileNames,
						...worksData.map((work) => `projects/${work.id}`),
						...skillsData.map((skill) => `skills/${skill.id}`)
					];
				} else if (command === 'help') targets = availableCommands;
				else if (command === 'open' && tokens.length === 3) targets = ['repo', 'demo'];
				const matches = targets.filter((target) =>
					target.toLowerCase().startsWith(prefix.toLowerCase())
				);
				if (matches.length === 1) inputValue = [...tokens.slice(0, -1), matches[0]].join(' ');
			}
			return;
		}
		if (!terminal.history.length) return;
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (historyIndex === -1) inputDraft = inputValue;
			historyIndex = Math.min(historyIndex + 1, terminal.history.length - 1);
			inputValue = terminal.history[terminal.history.length - 1 - historyIndex];
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			historyIndex = Math.max(historyIndex - 1, -1);
			inputValue =
				historyIndex === -1
					? inputDraft
					: terminal.history[terminal.history.length - 1 - historyIndex];
		}
	}

	function reuseCommand(command: string) {
		inputValue = command;
		historyIndex = -1;
		commandInput?.focus({ preventScroll: true });
	}

	async function runCommand(value: string) {
		const input = value.trim();
		if (!input || isRunning) return;
		const prompt = currentPrompt;
		const path = terminal.currentPath;
		isRunning = true;
		inputValue = '';
		historyIndex = -1;
		inputDraft = '';
		try {
			terminal.pushHistory(input);
			const result = await parseCommand(input, path);
			if (result.action?.type === 'open') {
				window.open(result.action.url, '_blank', 'noopener,noreferrer');
			}
			if (!result.skipOutput) {
				terminal.pushOutput(prompt, input, result.response, result.isError, result.historyEntries);
			}
		} finally {
			isRunning = false;
			await tick();
			if (terminal.isTerminalEnabled) commandInput?.focus({ preventScroll: true });
		}
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		void runCommand(inputValue);
	}
</script>

<svelte:window bind:innerWidth onkeydown={handleWindowKeydown} />

{#snippet outputLine(line: TerminalLine)}
	<div class="mb-3 last:mb-0">
		<div class="break-words">{formatLogPath(line.path)}{line.command}</div>
		{#if line.historyEntries?.length}
			<ol class="ml-4">
				{#each line.historyEntries as entry (entry.number)}
					<li>
						<button
							type="button"
							onclick={() => reuseCommand(entry.command)}
							title={t.reuse}
							class={`rounded px-1 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer text-left break-all ${focusStyle}`}
							><span class="mr-3 opacity-60">{entry.number}</span>{entry.command}</button
						>
					</li>
				{/each}
			</ol>
		{:else if typeof line.response === 'string'}
			<div class="ml-4 break-words whitespace-pre-wrap">{line.response}</div>
		{:else}
			{#each line.response as response, index (index)}
				<div
					class={`ml-4 ${line.command.trim() === 'fakefetch' ? 'whitespace-pre' : 'break-words whitespace-pre-wrap'}`}
				>
					{response || '\u00a0'}
				</div>
			{/each}
		{/if}
	</div>
{/snippet}

{#if terminal.isTerminalEnabled}
	<section
		id="terminal-panel"
		aria-label="Terminal"
		class="right-0 left-0 border-gray-400 bg-gray-200 font-mono text-sm text-black shadow-2xl md:text-base dark:border-gray-700 dark:text-lighttext fixed z-100 flex flex-col border-t dark:bg-[#0c0c0c]"
		style:bottom={`${keyboardOffset}px`}
		style:height={terminal.isHistoryOpened ? `${viewportHeight * 0.55}px` : 'auto'}
		style:max-height={`${Math.max(180, viewportHeight - 80)}px`}
		transition:fly={{ y: 16, duration: 220 }}
	>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable output needs keyboard access.) -->
		<div
			id="terminal-output"
			bind:this={outputViewport}
			role="log"
			aria-live="polite"
			aria-label="Terminal output"
			tabindex="0"
			class={`min-h-0 px-3 py-3 md:px-5 flex-1 overflow-auto ${focusStyle}`}
			style:max-height={terminal.isHistoryOpened
				? 'none'
				: `${Math.min(280, viewportHeight * 0.35)}px`}
		>
			{#if visibleLines.length === 0}
				{t.welcome}
			{:else}
				{#each visibleLines as line, index (index)}
					{@render outputLine(line)}
				{/each}
			{/if}
		</div>

		<div
			aria-label={t.examples}
			class="gap-2 border-gray-400 px-3 py-2 dark:border-gray-700 flex shrink-0 overflow-x-auto border-t"
		>
			{#each examples as command (command)}
				<button
					type="button"
					onclick={() => runCommand(command)}
					disabled={isRunning}
					class={`rounded border-gray-400 px-2 py-1 text-xs hover:bg-black/10 dark:border-gray-600 dark:hover:bg-white/10 shrink-0 cursor-pointer border disabled:opacity-50 ${focusStyle}`}
					>{command}</button
				>
			{/each}
		</div>

		<form
			onsubmit={handleSubmit}
			class="gap-2 border-gray-400 px-3 py-3 md:px-5 dark:border-gray-700 md:flex-row md:items-center flex shrink-0 flex-col border-t"
			style:padding-bottom="max(0.75rem, env(safe-area-inset-bottom))"
		>
			<div class="min-w-0 flex w-full flex-1 items-center">
				<span class="text-xs md:text-base shrink-0"
					>{innerWidth < 640 ? compactPrompt : currentPrompt}</span
				>
				<input
					bind:this={commandInput}
					bind:value={inputValue}
					type="text"
					aria-label={t.input}
					autocomplete="off"
					autocapitalize="off"
					spellcheck="false"
					enterkeyhint="go"
					onkeydown={handleKeydown}
					disabled={isRunning}
					class={`min-w-0 rounded px-1 py-1 flex-1 ${focusStyle}`}
				/>
			</div>
			<div
				class="gap-2 md:w-auto md:auto-cols-max md:grid-flow-col md:grid-cols-none md:gap-1 grid w-full shrink-0 grid-cols-3"
			>
				<button
					type="submit"
					disabled={isRunning}
					class={`rounded border-gray-400 px-2 py-1 text-sm font-bold dark:border-gray-600 md:border-0 md:px-3 cursor-pointer border disabled:opacity-50 ${focusStyle}`}
					>{t.run}</button
				>
				<button
					type="button"
					aria-label={terminal.isHistoryOpened ? t.collapse : t.expand}
					title={terminal.isHistoryOpened ? t.collapse : t.expand}
					aria-expanded={terminal.isHistoryOpened}
					aria-controls="terminal-output"
					onclick={() => (terminal.isHistoryOpened = !terminal.isHistoryOpened)}
					class={`rounded border-gray-400 px-2 py-1 font-hack text-lg font-bold dark:border-gray-600 md:border-0 md:px-3 cursor-pointer border text-center ${focusStyle}`}
					>󰄿</button
				>
				<button
					type="button"
					aria-label={t.close}
					title={t.close}
					onclick={closeTerminal}
					class={`border-gray-400 px-2 py-1 font-hack text-base dark:border-gray-600 md:border-t-0 md:border-r-0 md:border-b-0 md:border-l md:pl-4 cursor-pointer border text-center ${focusStyle}`}
					></button
				>
			</div>
		</form>
	</section>
{:else}
	<button
		bind:this={launcherButton}
		type="button"
		aria-label={t.open}
		aria-expanded="false"
		aria-controls="terminal-panel"
		onclick={() => (terminal.isTerminalEnabled = true)}
		class={`right-3 bottom-3 h-14 w-14 rounded-2xl border-gray-500 bg-gray-200 font-hack text-3xl shadow-lg md:h-17 md:w-17 dark:text-lighttext fixed z-100 cursor-pointer border-2 text-center dark:bg-[#0c0c0c] ${focusStyle}`}
		></button
	>
{/if}
