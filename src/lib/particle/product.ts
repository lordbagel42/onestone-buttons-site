import { Events } from './events';
import { Particle } from './particle';
import type { ProductListResponse, RGBA } from './particle.types';

export class Product extends Particle {
	async list(productId: string) {
		const res = await this.getRequest(`products/${productId}/devices`);

		return res as ProductListResponse;
	}
}

const particleEvents = new Events();

export const setLightColor = async (deviceId: string, color: RGBA) => {
	particleEvents.emit('onestone-buttons', {
		deviceID: deviceId,
		container: 'control',
		data: `${color.r}, ${color.g}, ${color.b}`
	});
};
