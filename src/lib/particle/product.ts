import { Particle } from './particle';
import type { ProductListResponse } from './particle.types';

export class Product extends Particle {
	async list(productId: string) {
		const res = await this.getRequest(`products/${productId}/devices`);

		return res as ProductListResponse;
	}
}
