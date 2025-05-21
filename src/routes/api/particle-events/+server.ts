import type { RequestHandler } from '@sveltejs/kit';
import { PARTICLE_AUTH_KEY } from '$env/static/private';

// You should store your Particle token in an environment variable, not in code
const PARTICLE_TOKEN = PARTICLE_AUTH_KEY;

export const GET: RequestHandler = async ({ request }) => {
	if (!PARTICLE_TOKEN) {
		return new Response('Particle token not configured', { status: 500 });
	}

	// Support filtering by eventName via query param
	const { searchParams } = new URL(request.url);
	const eventName = searchParams.get('eventName');
	const url = eventName
		? `https://api.particle.io/v1/events/${encodeURIComponent(eventName)}`
		: 'https://api.particle.io/v1/devices/events';

	const upstream = await fetch(url, {
		headers: {
			Accept: 'text/event-stream',
			Authorization: `Bearer ${PARTICLE_TOKEN}`
		}
	});

	if (!upstream.body) {
		return new Response('No response body from Particle SSE', { status: 502 });
	}

	const { readable, writable } = new TransformStream();
	const writer = writable.getWriter();
	const reader = upstream.body.getReader();
	const decoder = new TextDecoder('utf-8');
	let buffer = '';

	(async () => {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			buffer += decoder.decode(value, { stream: true });

			const lines = buffer.split('\n');
			buffer = lines.pop() || '';

			for (const line of lines) {
				if (line.startsWith('data: ')) {
					const data = line.slice(6);
					try {
						// Optionally, filter/transform event data here
						await writer.write(`data: ${data}\n\n`);
					} catch (e) {
						// console.error('Error writing to stream:', JSON.stringify(e));
					}
				}
			}
		}
		await writer.close();
	})();

	return new Response(readable, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive'
		}
	});
};
