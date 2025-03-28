import { getArticles } from '$lib/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const articles = await getArticles();

	return {
		articles: articles
	};
};
