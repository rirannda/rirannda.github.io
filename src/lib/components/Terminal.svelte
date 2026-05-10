<script lang="ts">
	import { fly } from 'svelte/transition';
	import { terminal } from '$lib/state/terminalState.svelte';
	import { availableDirs, parseCommand } from '$lib/terminal/parser';
	import { availableCommands as commands } from '$lib/terminal/parser';

	let inputValue = $state('');
	let historyIndex = $state(-1);
	const maxIndex = $derived(terminal.history.length - 1);
	const currentPrompt = $derived(
		'visitor@PortfoliOS:' +
			'~/portfolio' +
			(terminal.currentPath === '/' ? '' : terminal.currentPath) +
			' $ '
	);
	const compactPrompt = $derived(`...${terminal.currentPath} $ `);
	const currentPath = $derived(terminal.currentPath);
	const latest = $derived(terminal.output[terminal.output.length - 1]);
	let innerWidth = $state(1024);
	const isNarrow = $derived(innerWidth < 420);

	function formatLogPath(path: string) {
		if (!isNarrow) return path;

		const prefix = 'visitor@PortfoliOS:~/portfolio';
		if (!path.startsWith(prefix)) return path;

		const stripped = path.slice(prefix.length).replace(/\s*\$\s*$/, '');
		const compactPath = stripped || '/';
		return `...${compactPath} $ `;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			if (!inputValue) return;

			let tokens = inputValue.split(/\s+/);

			if (
				tokens.length === 1 &&
				(tokens[0] === 'cd' || tokens[0] === 'ls' || tokens[0] === 'theme')
			) {
				tokens.push(' ');
			}

			if (tokens.length === 1) {
				const prefix = tokens[0];
				const matches = commands.filter((cmd: string) => cmd.startsWith(prefix));
				if (matches.length === 1) {
					inputValue = matches[0] + ' ';
				}
			}
			if (tokens.length === 2) {
				const command = tokens[0];
				const prefix = tokens[1];

				let targets: string[] = [];

				if (command === 'cd' || command === 'ls') {
					targets = availableDirs;
				} else if (command === 'theme') {
					targets = ['light', 'dark'];
				} else if (command === 'open') {
					targets = ['github', 'discord'];
				}

				const matches = targets.filter((t) => t.startsWith(prefix));
				if (matches.length === 1) {
					// 候補が1つなら元のコマンドとくっつけて補完
					inputValue = `${command} ${matches[0]}`;
				}
			}
			return;
		}
		if (terminal.history.length === 0) {
			return;
		}
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			historyIndex += 1;
			if (historyIndex > maxIndex) {
				historyIndex = maxIndex;
			}
			inputValue = terminal.history[maxIndex - historyIndex];
		}
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			historyIndex -= 1;
			if (historyIndex <= -1) {
				historyIndex = -1;
				inputValue = '';
			} else {
				inputValue = terminal.history[maxIndex - historyIndex];
			}
		}
	}
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const input = inputValue.trim();
		if (input) {
			terminal.pushHistory(input); // Historyに保存
			const result = await parseCommand(input, currentPath);
			if (result && 'action' in result && result.action?.type === 'open') {
				window.open(result.action.url, '_blank', 'noopener,noreferrer');
			}
			terminal.pushOutput(
				currentPrompt,
				input,
				result.response,
				'isError' in result ? result.isError : false
			);
		}
		inputValue = '';
		historyIndex = -1;
	}
	function toggleTerminal() {
		terminal.isTerminalEnabled = !terminal.isTerminalEnabled;
	}
	function toggleExpand() {
		terminal.isHistoryOpened = !terminal.isHistoryOpened;
	}
</script>

<svelte:window bind:innerWidth />

<div id="terminalWrapper" class="right-0 bottom-0 sticky z-100">
	{#if terminal.isHistoryOpened}
		<div
			class={`${!terminal.isTerminalEnabled ? 'hidden' : ''} top-16 right-0 bottom-16 left-0 mt-1 bg-gray-200/90 p-3 font-mono text-sm text-black md:top-18 md:bottom-10 md:p-5 md:text-base dark:text-lighttext fixed z-50 overflow-x-auto overflow-y-auto transition-colors duration-300 dark:bg-[#0c0c0c]/90`}
		>
			{#each terminal.output as line, i (i)}
				<div class="mb-2">
					<div>{formatLogPath(line.path)}{line.command}</div>
					{#if typeof line.response === 'string'}
						<div class="ml-4">{line.response}</div>
					{:else}
						{#each line.response as resLine, j (j)}
							<div class="ml-4 whitespace-pre">{resLine}</div>
						{/each}
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<div
			class="bottom-20 border-t-gray-700 bg-gray-200 px-3 pt-2 font-mono text-sm md:bottom-13 md:px-5 md:text-base dark:text-lighttext fixed z-50 w-full overflow-x-auto border-t transition-all duration-300 dark:bg-[#0c0c0c]"
			class:commandline-enable={terminal.isTerminalEnabled}
			class:commandline-disable={!terminal.isTerminalEnabled}
			transition:fly={{ y: 16, duration: 220 }}
		>
			{#if latest == undefined}
				Welcome to PortfoliOS! Type 'help' to start.
			{:else}
				{formatLogPath(latest.path)}{latest.command}
				<br />
				{#if typeof latest.response === 'string'}
					<div class="ml-4">{latest.response}</div>
				{:else}
					{#each latest.response as resLine, i (i)}
						<div class="ml-4 whitespace-pre">{resLine}</div>
					{/each}
				{/if}
			{/if}
		</div>
	{/if}
	<form
		onsubmit={handleSubmit}
		class="right-0 bottom-0 left-0 bg-gray-200 p-2 font-mono dark:text-lighttext pt-8 fixed z-25 transition-all duration-300 dark:bg-[#0c0c0c]"
		class:commandline-enable={terminal.isTerminalEnabled}
		class:commandline-disable={!terminal.isTerminalEnabled}
		transition:fly={{ y: 16, duration: 220 }}
	>
		<div class="gap-2 md:flex-row md:items-center md:px-3 flex w-full flex-col">
			<div class="min-w-0 flex w-full items-center">
				<span class="text-sm md:text-base shrink-0">{isNarrow ? compactPrompt : currentPrompt}</span
				>
				<input
					type="text"
					bind:value={inputValue}
					aria-label="Terminal Command input"
					onkeydown={handleKeydown}
					class="min-w-0 pl-2 text-sm md:pl-3 md:text-base w-full flex-1 outline-0"
				/>
			</div>
			<div
				class="right-0 gap-2 md:w-auto md:auto-cols-max md:grid-flow-col md:grid-cols-none md:gap-1 grid w-full grid-cols-3"
			>
				<input
					type="submit"
					class="rounded border-gray-400 px-2 py-1 text-sm font-bold md:border-0 md:px-3 border outline-0"
					value="Run"
				/>
				<button
					type="button"
					aria-label="Expand Command History"
					onclick={toggleExpand}
					class="rounded border-gray-400 px-2 py-1 text-lg font-bold md:border-0 md:px-3 border text-center font-[NerdFont] outline-0"
					>󰄿</button
				>
				<button
					type="button"
					aria-label="Close Terminal"
					onclick={toggleTerminal}
					class="border-gray-400 px-2 py-1 text-base md:right-0 md:border-t-0 md:border-r-0 md:border-b-0 md:border-l md:border-l-gray-400 md:pl-4 border text-center font-[NerdFont] outline-0"
					></button
				>
			</div>
		</div>
	</form>
	<button
		type="button"
		aria-label="Open Terminal"
		onclick={toggleTerminal}
		class={`${terminal.isTerminalEnabled ? 'hidden' : ''} right-0 bottom-0 h-14 w-14 rounded-2xl border-gray-500 bg-gray-200 p-2.5 pl-1 text-3xl  md:h-17 md:w-17 md:p-3.5 dark:text-lighttext  absolute z-100 border-2 font-[NerdFont] transition-all dark:bg-[#0c0c0c]`}
		></button
	>
</div>
