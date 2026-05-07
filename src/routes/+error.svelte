<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';

	const status = $derived($page.status);
	const currentPath = $derived($page.url.pathname);
</script>

<svelte:head>
	<title>{status} Kernel Panic | PortfoliOS</title>
</svelte:head>

<div
	class="font-mono text-gray-300 sm:text-base pt-25 md:text-lg px-5 flex h-screen w-full max-w-screen flex-col justify-center bg-[#010082] text-left"
>
	<div class="mb-6 gap-6 flex justify-center">
		<pre class="font-mono leading-5 text-white block text-left">
              _
   .--.      | |
  |o_o |     | |
  |:_/ |     | |
 //    \\     -
( |     |)    _
/'\_  _/`\   | |
\___)=(__/    -
        </pre>
		<div class="pt-2 flex-col text-left">
			<p class="font-bold text-lg md:text-2xl">PortfoliOS Kernel Panic (Folix)</p>
			<h3 class="text-5xl md:text-7xl text-white">404</h3>
			<p class="text-2xl md:text-4xl">Not Found</p>
		</div>
	</div>

	<div class="text-red-400 md:flex hidden flex-col items-center whitespace-pre-wrap">
		<div class="text-left">
			<p class="font-bold text-red-500">
				Kernel panic - not syncing: VFS: Unable to mount root fs on unknown-block({status},0)
			</p>
			<p>[ 0.{status}00] Hardware name: Web Browser/SvelteKit, BIOS 1.0</p>
			<p>[ 0.{status}00] &lt;PAGE_NOT_FOUND&gt;</p>
			<p>
				[ 0.{status}00] User attempted to access a non-existent URL:
				<span class="text-white">{currentPath}</span>
			</p>
			<p>[ 0.{status}00] ---[ end Kernel panic - not syncing: VFS: Unable to mount root fs ]---</p>
		</div>
	</div>

	<div class="pb-1 mt-10 flex flex-col items-center">
		<p class="animate-pulse font-bold text-white">System halted. Please reboot.</p>
		<div class="mt-8">
			<a
				href={resolve('/')}
				class="border-gray-500 bg-gray-800 px-6 py-2 text-white hover:bg-white hover:text-black focus:ring-white focus:ring-offset-black inline-block border transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
			>
				[ Reboot System ]
			</a>
		</div>
	</div>
</div>
