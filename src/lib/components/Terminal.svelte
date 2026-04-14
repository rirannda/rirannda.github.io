<script lang="ts">
	import { terminal } from '$lib/state/terminalState.svelte';
	import { page } from '$app/state';

	let inputValue = $state('');
	let historyIndex = $state(-1);
	const maxIndex = $derived(terminal.history.length - 1);
	const currentPrompt = $derived(
		'visitor@Folix: ~/portfolio' + (page.url.pathname == '/' ? '' : page.url.pathname) + '$ '
	);

	function handleKeydown(event: KeyboardEvent) {
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
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const input = inputValue.trim();
		if (input) {
			terminal.pushHistory(input); // Historyに保存
			// コマンドのパースなどの処理
		}
		inputValue = '';
		historyIndex = -1;
	}
</script>

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
</form>
