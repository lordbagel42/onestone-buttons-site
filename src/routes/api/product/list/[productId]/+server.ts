import { json } from '@sveltejs/kit';
import { Product } from '$lib/particle/product';
import { PARTICLE_AUTH_KEY } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ params, request }: RequestEvent) {
	console.log('Incoming request:', { params, request }); // Add logging
	const product = new Product(PARTICLE_AUTH_KEY);

	if (!params.productId) {
		return json({ error: 'Missing productId parameter' }, { status: 400 });
	}

	const result = await product.list(params.productId);

	return json(result);
}
