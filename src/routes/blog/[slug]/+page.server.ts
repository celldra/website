import { getArticle } from '$lib/blog';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const article = await getArticle(params.slug);
	if (!article) {
		error(404, 'Article not found');
	}

	return {
		article
	};
};
