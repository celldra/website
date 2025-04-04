import { getArticles } from '$lib/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const articles = await getArticles();
	if (articles.length > 3) {
		articles.length = 3;
	}

	return {
		articles: articles
	};
};
