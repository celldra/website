<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Home, LayoutPanelLeft, Moon, Newspaper, Sun } from 'lucide-svelte';
	import '../app.css';

	import { ModeWatcher, mode, toggleMode } from 'mode-watcher';

	let { children } = $props();

	let y: number = $state(0);
	let scrolled: boolean = $derived(y > 10);
</script>

<div
	class="bg-secondary/85 border-border sticky top-0 z-50 flex items-center justify-between border-b px-4 py-3 backdrop-blur-lg"
	class:scrolled
>
	<div class="flex items-center">
		<span class="font-mono text-primary mr-8"> &lt;celldra.dev&gt; </span>

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

	<Button onclick={toggleMode} variant="ghost" size="icon">
		{#if $mode === 'dark'}
			<Sun />
		{:else}
			<Moon />
		{/if}
	</Button>
</div>

<div class="container mt-12">
	{@render children()}
</div>

<ModeWatcher />

<svelte:window bind:scrollY={y} />
