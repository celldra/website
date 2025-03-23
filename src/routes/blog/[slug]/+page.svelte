<script lang="ts">
	import { page } from '$app/state';
	import type { Article } from '$lib/blog';
	import { relativeTime } from '$lib/utils';
	import { marked } from 'marked';

	let article: Article = page.data.article;
	let data: string | Promise<string> = marked.parse(article.raw ?? '');
</script>

<section id="title" class="border-border mb-4 border-b">
	<h1 class="mb-2 text-3xl font-bold">{article.title}</h1>
	<p class="text-muted-foreground mb-4 text-sm">Created {relativeTime(article.date)}</p>
</section>

<div class="blog">
	{@html data}
</div>
