import type { RequestHandler } from '@sveltejs/kit';
import { PARTICLE_AUTH_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ request }) => {
	if (!PARTICLE_AUTH_KEY) {
		return new Response('Particle token not configured', { status: 500 });
	}

	const { searchParams } = new URL(request.url);
	const eventName = searchParams.get('eventName');
	const url = eventName
		? `https://api.particle.io/v1/events/${encodeURIComponent(eventName)}`
		: `https://api.particle.io/v1/devices/events`;

	// Start fetching the Particle SSE stream
	const upstream = await fetch(url, {
		headers: {
			Accept: 'text/event-stream',
			Authorization: `Bearer ${PARTICLE_AUTH_KEY}`
		}
	});

	if (!upstream.body) {
		return new Response('No response body from Particle SSE', { status: 502 });
	}

	// Setup SSE response to the client
	const encoder = new TextEncoder();
	const stream = new ReadableStream({
		start(controller) {
			const reader = upstream.body!.getReader();
			let buffer = '';
			const decoder = new TextDecoder('utf-8');

			// Flush headers immediately so browser starts processing
			controller.enqueue(encoder.encode(':\n\n'));

			// function pushHeartbeat() {
			// 	controller.enqueue(encoder.encode(`:heartbeat\n\n`));
			// }
			// const heartbeat = setInterval(pushHeartbeat, 15000);

			const pump = async () => {
				try {
					while (true) {
						const { done, value } = await reader.read();
						if (done) break;

						buffer += decoder.decode(value, { stream: true });
						const lines = buffer.split('\n');
						buffer = lines.pop() ?? '';

						for (const line of lines) {
							if (line.startsWith('data: ')) {
								const data = line.slice(6);
								controller.enqueue(encoder.encode(`data: ${data}\n\n`));
							}
						}
					}
				} catch (e) {
					console.error('SSE stream error:', e);
				} finally {
					// clearInterval(heartbeat);
					controller.close();
				}
			};

			pump();
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive'
		}
	});
};

export const POST: RequestHandler = async ({ request }) => {
	if (!PARTICLE_AUTH_KEY) {
		return new Response('Particle token not configured', { status: 500 });
	}

	const body = (await request.json()) as {
		eventName?: string;
		data?: unknown;
		ttl?: number;
		private?: boolean;
	};

	const { eventName, data, ttl = 60, private: isPrivate = true } = body;

	if (!eventName || data === undefined) {
		return new Response('Missing required fields: eventName and data', { status: 400 });
	}

	const form = new URLSearchParams();
	form.set('name', eventName);
	form.set('data', typeof data === 'string' ? data : JSON.stringify(data));
	form.set('ttl', ttl.toString());
	form.set('private', isPrivate ? 'true' : 'false');

	const response = await fetch('https://api.particle.io/v1/devices/events', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${PARTICLE_AUTH_KEY}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: form.toString()
	});

	if (!response.ok) {
		const text = await response.text();
		console.error('Failed to publish event:', text);
		return new Response('Failed to publish event', { status: response.status });
	}

	const result = await response.json();
	return new Response(JSON.stringify(result), {
		headers: { 'Content-Type': 'application/json' }
	});
};
