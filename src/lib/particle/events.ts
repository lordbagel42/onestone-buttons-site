// import { Particle } from './particle';
import type { ParticleEvent } from './particle.types';

export class Events {
	// Subscribe to all Particle events

	/**
	 * Subscribe to all Particle events using Server-Sent Events (SSE).
	 * @param onEvent Callback for each parsed event
	 */
	subscribeAll(onEvent: (event: ParticleEvent) => void) {
		// Use your own backend endpoint to avoid exposing secrets
		const url = '/api/particle-events';
		const eventSource = new EventSource(url);

		eventSource.onmessage = (event) => {
			try {
				const raw = JSON.parse(event.data);
				const eventObj: ParticleEvent = {
					data: typeof raw.data === 'string' ? JSON.parse(raw.data) : raw.data,
					ttl: raw.ttl,
					published_at: raw.published_at,
					coreid: raw.coreid
				};
				onEvent(eventObj);
			} catch (e) {
				console.error('Failed to parse event data as JSON:', event.data, e);
			}
		};

		eventSource.onerror = (err) => {
			console.error('SSE connection error:', err);
		};

		return () => {
			eventSource.close();
		};
	}

	subscribe(eventName: string, onEvent: (event: ParticleEvent) => void) {
		// Use your own backend endpoint to avoid exposing secrets
		const url = `/api/particle-events?eventName=${encodeURIComponent(eventName)}`;
		const eventSource = new EventSource(url);

		eventSource.onmessage = (event) => {
			try {
				const raw = JSON.parse(event.data);
				const eventObj: ParticleEvent = {
					data: typeof raw.data === 'string' ? JSON.parse(raw.data) : raw.data,
					ttl: raw.ttl,
					published_at: raw.published_at,
					coreid: raw.coreid
				};
				onEvent(eventObj);
			} catch (e) {
				console.error('Failed to parse event data as JSON:', event.data, e);
			}
		};

		eventSource.onerror = (err) => {
			console.error('SSE connection error:', err);
		};

		return () => {
			eventSource.close();
		};
	}

	// /**
	//  * Emit (publish) a Particle event via your backend API.
	//  * @param eventName The name of the event to publish
	//  * @param data The data to send (object or string)
	//  * @param options Optional: {private: boolean, ttl: number}
	//  * @returns Promise resolving to the API response
	//  */
	// async emit(eventName: string, data: any, options?: { private?: boolean; ttl?: number }) {
	// 	// The backend expects: name, data, ttl, private
	// 	const payload: Record<string, any> = {
	// 		eventName,
	// 		data
	// 	};
	// 	if (options?.private !== undefined) payload.private = options.private;
	// 	if (options?.ttl !== undefined) payload.ttl = options.ttl;
	// 	const res = await fetch('/api/particle-events', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify(payload)
	// 	});
	// 	if (!res.ok) {
	// 		throw new Error(`Failed to emit event: ${res.status} ${res.statusText}`);
	// 	}
	// 	return res.json();
	// }
}
