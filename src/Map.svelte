<script>
	import {onMount, onDestroy} from "svelte";
	import {LeafletMap, TileLayer, Marker, Popup} from 'svelte-leafletjs';
	import L from 'leaflet';
	import { screen } from './state.js';
	import * as Util from './util.js';

	import Menu from './Menu.svelte';
	
	export let airrow;

	const mapOptions = {
		center: [49.02138, 12.10181],
		zoom: 16,
	};
	const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	const tileLayerOptions = {
		minZoom: 0,
		maxZoom: 20,
		maxNativeZoom: 19,
		attribution: "© OpenStreetMap contributors",
	};
	const iconOptions = L.icon({
		iconUrl: '/assets/icons/map/marker-icon.png'
	});

	function startNav(status) {
		airrow.status = status;
		$screen = 'nav';
	}

	function viewPoint(refCode) {
		airrow.targetRefCode = refCode;
		$screen = 'view';
	}

	function handleMapChange() {
		const center = leafletMap.getMap().getCenter();
		const position = {
			coords: {
				latitude: center.lat,
				longitude: center.lng
			}
		};
		markers = airrow.getPublicPoints(position);
	}

	let markers = null;

	let leafletMap;

	onMount(() => {
		handleMapChange();
    });

	onDestroy(() => {
		// important for cleanup
		// do not remove
	});
</script>

<div class="screen">
	<div class="map">
		<LeafletMap bind:this={leafletMap} options={mapOptions}>
			<TileLayer url={tileUrl} options={tileLayerOptions}/>
			{#if markers}
			{#await markers then data}
				{#each data.points as m}
				<Marker icon={iconOptions} latLng={[m.location.lat, m.location.lon]}>
					<Popup>
						<div class="overview">
							<h2>Objektname</h2>
							
							<div class="preview">
								{Util.mimeToEmoji(m.mimeType)}
							</div>
						</div>
						<div class="actions">
							<p>
								<span on:click={() => startNav(m.status)}>Suche: ▶️</span>
							</p>
							<p>
								oder
							</p>
							<p>
								<span on:click={() => viewPoint(m.refCode)}>Ansicht: 🔍</span>
							</p>
						</div>
					</Popup>
				</Marker>
				{/each}
			{/await}
			{/if}
		</LeafletMap>
	</div>
	<div class="menu">
		<Menu />
	</div>
</div>

<style>
	.map {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.menu {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 2;
		grid-row-end: -1;

		display: flex;
	}

	:global(.leaflet-popup-content .overview h2) {
		font-size: 5vh;
	}

	:global(.leaflet-popup-content .overview .preview) {
		font-size: 10vh;
	}

	:global(.leaflet-popup-content .actions p) {
		font-size: 5vh;
	}
	
</style>
