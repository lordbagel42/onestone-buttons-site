<script lang="ts">
	import { Events } from '$lib/particle/events';
	import type { ParticleActionEvent, ParticleStatusEvent } from '$lib/particle/particle.types';
	import { onMount } from 'svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	let isHigh: boolean = $state(false);

	let productId: string = $state('buttons-37734');
	let deviceList: any = $state();
	let events: (ParticleActionEvent | ParticleStatusEvent)[] = $state([]);

	const particleEvents = new Events();

	const getList = (id: string) => {
		fetch(`/api/product/list/${id}`)
			.then((response) => response.json())
			.then((data) => {
				deviceList = data;
				console.log('Device list:', deviceList);
			})
			.catch((error) => {
				console.error('Error fetching device list:', error);
			});
	};

	onMount(() => {
		getList(productId);
		particleEvents.subscribe('onestone-buttons', (event: any) => {
			console.log('Received event:', event);
			events = [...events, event];
		});
	});

	// onMount(() => {
	// 	deviceList = { devices: [{ id: 'test123', name: 'Test Device', status: 'online' }] };
	// 	events = [
	// 		{
	// 			data: { deviceID: 'test123', container: 'action', data: 'HIGH' },
	// 			ttl: 60,
	// 			published_at: new Date().toISOString(),
	// 			coreid: 'test123'
	// 		}
	// 	];

	// 	console.log('Device list:', deviceList);
	// 	console.log('Events:', events);
	// });

	const eventsForDevice = (deviceID: string) => {
		console.log('Events for device:', deviceID);
		return events.filter((event) => event?.data?.deviceID === deviceID);
	};

	const high = async () => {
		particleEvents.emit('onestone-buttons', {
			deviceID: 'test123',
			container: 'action',
			data: 'HIGH'
		});
	};

	const low = async () => {
		particleEvents.emit('onestone-buttons', {
			deviceID: 'test123',
			container: 'action',
			data: 'LOW'
		});
	};
</script>

{#if deviceList && deviceList.devices.length > 0}
	<div class="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3">
		{#each deviceList.devices as device}
			{@const lastEvent = eventsForDevice(device.id)[eventsForDevice(device.id).length - 1]}
			{@const anyPressed = deviceList.devices.some((d: { id: string }) => {
				const devEvents = eventsForDevice(d.id);
				const last = devEvents[devEvents.length - 1];
				return last && last.data.data === 'HIGH';
			})}
			<Card
				class={anyPressed
					? lastEvent && lastEvent.data.data === 'HIGH'
						? 'bg-green-300'
						: 'bg-blue-300'
					: 'bg-purple-300'}
			>
				<CardHeader>
					<CardTitle class="text-lg font-semibold">{device.name || 'Unnamed Device'}</CardTitle>
					<p class="text-sm text-gray-500">ID: {device.id}</p>
				</CardHeader>
				<CardContent class="space-y-2">
					<p class="text-sm">
						<span class="font-medium">Status:</span>
						<span class={device.status === 'online' ? 'text-green-600' : 'text-red-600'}>
							{device.status}
						</span>
					</p>

					{#if eventsForDevice(device.id).length > 0}
						<div class="mt-2 space-y-1">
							<h3 class="text-sm font-semibold">Current State:</h3>
							<ul class="space-y-1">
								{#if lastEvent}
									<li class="rounded-md p-2 text-xs font-bold">
										<code>{lastEvent.data.data === 'HIGH' ? 'Pressed' : 'Released'}</code>
									</li>
								{/if}
							</ul>
						</div>
					{:else}
						<div class="mt-2 space-y-1">
							<h3 class="text-sm font-semibold">Current State:</h3>
							<ul class="space-y-1">
								<li class="rounded-md p-2 text-xs font-bold">
									<code>Released</code>
								</li>
							</ul>
						</div>
					{/if}
				</CardContent>
			</Card>
		{/each}
		<Card
			class="flex h-full items-center justify-center bg-purple-300"
			onclick={() => {
				if (isHigh) {
					low();
				} else {
					high();
				}
				isHigh = !isHigh;
			}}
		>
			<!-- <CardHeader>
				<CardTitle class="text-lg font-semibold">TOGGLE</CardTitle>
			</CardHeader> -->
			<CardContent class="flex h-full items-center justify-center">
				<div class="flex h-full items-center justify-center">
					<h1 class="text-4xl font-bold">TOGGLE</h1>
				</div>
			</CardContent>
		</Card>
	</div>
{:else if deviceList && deviceList.devices.length === 0}
	<p class="mt-4 text-gray-500">No devices found.</p>
{/if}
