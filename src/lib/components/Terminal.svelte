<script lang="ts">
	import { terminal } from '$lib/state/terminalState.svelte';
	import { page } from '$app/state';
	import { availableDirs, parseCommand } from '$lib/terminal/parser';
	import { availableCommands as commands } from '$lib/terminal/parser';

	let inputValue = $state('');
	let historyIndex = $state(-1);
	let isExpanded = $state(false);
	const maxIndex = $derived(terminal.history.length - 1);
	const currentPrompt = $derived(
		'visitor@PortfoliOS:~/portfolio' + (page.url.pathname == '/' ? '' : page.url.pathname) + '$ '
	);
	const currentPath = $derived(page.url.pathname == '/' ? '' : page.url.pathname);
	const latest = $derived(terminal.output[terminal.output.length - 1]);

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
				}

				const matches = targets.filter((t) => t.startsWith(prefix));
				if (matches.length === 1) {
					// 候補が1つなら元のコマンドとくっつけて補完
					inputValue = `${command} ${matches[0]}`;
				}
			}
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
	function toggleExpand() {
		isExpanded = !isExpanded;
	}
</script>

{#if isExpanded}
	<div
		class="fixed top-20 right-0 bottom-10 left-0 z-50 overflow-y-auto bg-black/90 p-4 font-mono text-white"
	>
		{#each terminal.output as line, i (i)}
			<div class="mb-2 text-white">
				<div>{line.path} {line.command}</div>
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
	<div class="fixed bottom-10 z-50 w-full bg-black px-5 font-mono text-white">
		{#if latest == undefined}
			Welcome to PortfoliOS! Type 'help' to start.
		{:else}
			{latest.path}
			{latest.command} <br />
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
	class="justify-content fixed bottom-0 flex w-full bg-black p-2 px-5 font-mono text-white"
>
	<span class="">{currentPrompt}</span>
	<input
		type="text"
		bind:value={inputValue}
		onkeydown={handleKeydown}
		class="w-auto flex-1 pl-3 outline-0"
	/>
	<input type="submit" class="ml-2 font-bold outline-0" value="Run" />
	<button onclick={toggleExpand} class="justify-center py-0 pl-3 font-[NerdFont] text-xl font-bold"
		>󰄿</button
	>
</form>
