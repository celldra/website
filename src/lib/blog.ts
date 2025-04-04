import fm from 'front-matter';
import { get, writable } from 'svelte/store';

export const articleCache = writable<Article[]>(await getArticles(true));

export interface Article {
	slug: string;
	title: string;
	description: string;
	date: string;
	raw: string;
}

export async function getArticles(init: boolean = false): Promise<Article[]> {
	if (!init) {
		const cachedArticles = get(articleCache);
		if (cachedArticles && cachedArticles.length > 0) {
			return cachedArticles;
		}
	}

	const modules = import.meta.glob('../articles/*.md', {
		query: '?raw',
		import: 'default',
		eager: true
	});

	const articles: Article[] = [];

	for (const path in modules) {
		const rawContent = modules[path] as string;
		const { body, attributes } = fm(rawContent);

		const slug = path.split('/').pop()?.replace('.md', '') ?? '';

		articles.push({
			slug,
			title: attributes.title,
			description: attributes.description,
			date: attributes.date,
			raw: body
		});
	}

	// Optional: sort by date descending
	articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	return articles;
}

export async function getArticle(slug: string): Promise<Article | undefined> {
	let articles = get(articleCache);
	if (!articles || articles.length === 0) {
		articles = await getArticles();
		articleCache.set(articles);
	}

	const article = articles.find((article) => article.slug === slug);
	return article;
}
