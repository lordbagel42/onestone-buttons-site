// This file will contain the expanded Particle API client, with methods for all endpoints.
// Each method will use the types from particle.types.ts for type safety.

import type * as Types from './particle.types';
import { Particle } from './particle';

export class ParticleAPI extends Particle {
	// DEVICE ENDPOINTS
	async listDevices(params?: Types.DeviceListRequest): Promise<Types.DeviceListResponse> {
		return this.request<Types.DeviceListResponse>('v1/devices', 'GET', params);
	}

	async getDeviceInfo(params: Types.DeviceInfoRequest): Promise<Types.DeviceInfoResponse> {
		return this.request<Types.DeviceInfoResponse>(`v1/devices/${params.deviceId}`, 'GET');
	}

	async claimDevice(params: Types.DeviceClaimRequest): Promise<Types.DeviceClaimResponse> {
		return this.request<Types.DeviceClaimResponse>(
			'v1/devices',
			'POST',
			{ id: params.id },
			'application/x-www-form-urlencoded'
		);
	}

	async unclaimDevice(params: Types.DeviceUnclaimRequest): Promise<Types.DeviceUnclaimResponse> {
		return this.request<Types.DeviceUnclaimResponse>(`v1/devices/${params.deviceId}`, 'DELETE');
	}

	// PRODUCT ENDPOINTS
	async listProducts(params?: Types.ProductListRequest): Promise<Types.ProductListResponse> {
		return this.request<Types.ProductListResponse>('v1/products', 'GET', params);
	}

	async getProductInfo(params: Types.ProductInfoRequest): Promise<Types.ProductInfoResponse> {
		return this.request<Types.ProductInfoResponse>(`v1/products/${params.productId}`, 'GET');
	}

	// EVENT ENDPOINTS
	async publishEvent(params: Types.PublishEventRequest): Promise<Types.PublishEventResponse> {
		return this.request<Types.PublishEventResponse>(
			'v1/devices/events',
			'POST',
			params,
			'application/x-www-form-urlencoded'
		);
	}

	async listEvents(params?: Types.ListEventsRequest): Promise<Types.ListEventsResponse> {
		// If deviceId or productId is provided, use the appropriate endpoint
		if (params?.deviceId) {
			return this.request<Types.ListEventsResponse>(`v1/devices/${params.deviceId}/events`, 'GET');
		} else if (params?.productId) {
			return this.request<Types.ListEventsResponse>(
				`v1/products/${params.productId}/events`,
				'GET'
			);
		}
		// Otherwise, get all events
		return this.request<Types.ListEventsResponse>('v1/events', 'GET');
	}
}
