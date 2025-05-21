<script lang="ts">
	import { Product } from '$lib/particle/product';
	import { onMount } from 'svelte';

	let productId: string = 'buttons-37734';
	let deviceList: any = $state();

	const getList = (id: string) => {
		fetch(`/api/product/${id}/list`)
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
		// Fetch the device list when the component mounts
		getList(productId);
	});
</script>

<input type="text" bind:value={productId} placeholder="Enter product ID" />

{#if deviceList && deviceList.devices.length > 0}
	<h2>Device List:</h2>
	<p>Total devices: {deviceList.devices.length}</p>
	<ul>
		{#each deviceList.devices as device}
			<li>
				<p>Device ID: {device.id}</p>
				<p>Device Name: {device.name}</p>
				<p>Device Status: {device.status}</p>
			</li>
		{/each}
	</ul>
{:else if deviceList && deviceList.devices.length === 0}
	<p>No devices found.</p>
{/if}
