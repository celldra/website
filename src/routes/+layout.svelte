<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Home, LayoutPanelLeft, Moon, Newspaper, Sun } from 'lucide-svelte';
	import '../app.css';

	import { ModeWatcher, mode, toggleMode } from 'mode-watcher';
	import { onNavigate } from '$app/navigation';
	import { SiGithub } from '@icons-pack/svelte-simple-icons';

	let { children } = $props();

	let y: number = $state(0);
	let scrolled: boolean = $derived(y > 10);

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div
	style="view-transition-name: header;"
	class="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-secondary/85 px-4 py-3 backdrop-blur-lg"
	class:scrolled
>
	<div class="flex items-center">
		<span class="mr-8 font-mono text-primary"> &lt;celldra.dev&gt; </span>

		<Button href="/" variant="ghost">
			<Home />
			Home
		</Button>

		<Button href="/projects" variant="ghost">
			<LayoutPanelLeft />
			Projects
		</Button>

		<Button href="/blog" variant="ghost">
			<Newspaper />
			Blog
		</Button>
	</div>

	<div class="flex items-center">
		<Button href="https://github.com/celldra/website" target="_blank" variant="ghost" size="icon">
			<SiGithub />
		</Button>
		<Button onclick={toggleMode} variant="ghost" size="icon">
			{#if $mode === 'dark'}
				<Sun />
			{:else}
				<Moon />
			{/if}
		</Button>
	</div>
</div>

<div class="container mt-12">
	{@render children()}
</div>

<ModeWatcher />

<svelte:window bind:scrollY={y} />
