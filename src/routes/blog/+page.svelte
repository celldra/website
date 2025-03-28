<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as Card from '$lib/components/ui/card';
	import { relativeTime } from '$lib/utils';
</script>

<section id="title" class="border-b border-border">
	<h2 class="mb-2 text-2xl font-bold">Welcome to my blog!</h2>
	<p class="mb-6 text-lg text-muted-foreground">
		Where you will find either the most stupid or crazy stories about my software engineering
		career.
	</p>
</section>

<section id="articles" class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each page.data.articles as article}
		<Card.Root
			class="cursor-pointer transition-colors duration-150 hover:bg-muted"
			onclick={async () => await goto(`/blog/${article.slug}`)}
		>
			<Card.Header>
				<Card.Title>
					{article.title}
				</Card.Title>
				<Card.Description>Created {relativeTime(article.created)}</Card.Description>
			</Card.Header>
			<Card.Content>
				{article.description}
			</Card.Content>
		</Card.Root>
	{/each}
</section>
