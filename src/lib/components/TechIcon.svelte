<script lang="ts">
	import type { Tech } from '$lib/data/techs';

	let { icon }: { icon: Tech['icon'] } = $props();
</script>

{#if typeof icon === 'string'}
	<span class="font-hack" aria-hidden="true">{icon}</span>
{:else}
	<img
		src={icon.src}
		alt=""
		aria-hidden="true"
		class="inline-block h-[1em] w-auto shrink-0 align-middle"
	/>
{/if}
