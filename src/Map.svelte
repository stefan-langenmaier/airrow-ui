<script>
	import {onMount, onDestroy} from "svelte";
	import {LeafletMap, TileLayer, Marker, Popup} from 'svelte-leafletjs';
	import L from 'leaflet';
	import { screen } from './state.js';
	import * as Util from './util.js';

	import Menu from './Menu.svelte';
	
	export let airrow;

	airrow.registerPositionUpdate(handlePositionUpdate);

	let self = null;

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
		iconUrl: '/assets/icons/map/marker-icon.png',
		shadowUrl: '/assets/icons/map/shadow-default.png',
		shadowAnchor: [20, 20]
	});

	const selfIconOptions = L.icon({
		iconUrl: '/assets/icons/map/marker-self.png',
		shadowUrl: '/assets/icons/map/shadow-self.png',
		shadowAnchor: [20, 20]
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

	function handlePositionUpdate(pos) {
		self = {
			location: {
				lat: pos.coords.latitude,
				lon: pos.coords.longitude
			}
		};
	}

	let selection = null;

	function select(marker) {
		selection = marker;
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
				<Marker icon={iconOptions} latLng={[m.location.lat, m.location.lon]} events={['click']} on:click={() => select(m)}>
				</Marker>
				{/each}
			{/await}
			{/if}
			{#if self}
				<Marker icon={selfIconOptions} latLng={[self.location.lat, self.location.lon]}>
				</Marker>
			{/if}
		</LeafletMap>
	</div>
	<div class="menu">
		{#if selection}
		<div class="popup">
			<div class="action">
				<div class="close" on:click="{() => { selection = null }}">
					<img src="/assets/icons/map/close.svg" alt="Schliessen" />
				</div>
			</div>
			<div class="description">
				<div class="overview">
					<h1>echo on survival</h1>
					
					<p>
						Hemauerstraße 128<br>
						93047 Regensburg
					</p>
				</div>
			</div>
			<div class="routing">
				<button on:click={() => startNav(selection.status)}>Route starten</button>
				<div class="estimation">
					<p>
						15 Minuten zu Fuß
					</p>
				</div>
			</div>
			<hr />
			<div class="action">
				<div class="share">
					<img src="/assets/icons/map/share.svg" alt="Teilen" />
				</div>
				<div class="like">
					<img src="/assets/icons/map/like.svg" alt="Markieren" />
				</div>
			</div>
			<div class="details">
				<a href="/#" on:click={() => viewPoint(selection.refCode)}>
					<img src="/assets/icons/map/info.svg" alt="Info" />
					Mehr zum Kunstwerk
				</a>
			</div>
		</div>
		{/if}
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

	.popup {
		position: absolute;
		z-index: 1001;
		width: 100vw;
		transform: translateY(-100%);

		border-top-left-radius: 1em;
		border-top-right-radius: 1em;
		box-shadow: 0 0 1em;
		background-color: var(--background-color-submenu);
	}

	.action {
		position: absolute;
		right: 1em;
		display: flex;
	}

	.close {
		margin-top: 0.5em;
	}

	hr {
		color: var(--background-color);
	}

	.description {
		padding-top: 1em;
		padding-left: 1em;
		padding-right: 1em;
	}

	.details {
		padding-bottom: 1em;
		padding-left: 1em;
		padding-right: 1em;
	}

	.details img {
		vertical-align: middle;
	}

	.routing {
		padding-left: 1em;
		padding-right: 1em;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	button {
		border-radius: 1.5em;
		color: var(--font-color-button);
		background-color: var(--background-color-button);
		padding: 1em;
		font-size: large;
		font-weight: bold;
	}

	.estimation p {
		margin-top: 0px;
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
