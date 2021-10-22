<script>
	import {onMount, onDestroy} from "svelte";
	import { _ } from 'svelte-i18n';
	import {LeafletMap, TileLayer, Marker} from 'svelte-leafletjs';
	import L from 'leaflet';
	import { screen } from './state.js';
	import * as Util from './util.js';

	export let airrow;
	let targetPromise = airrow.getTarget(airrow.targetRefCode);
	airrow.registerPositionUpdate(handlePositionUpdate);
	
	let self = null;
	let target = null;

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

	function handlePositionUpdate(pos) {
		self = {
			location: {
				lat: pos.coords.latitude,
				lon: pos.coords.longitude
			}
		};
		navState = airrow.getNavState();
		if (airrow.hasFoundTarget(navState)) {
			$screen = "view";
			clearInterval(updateWatch);
			updateWatch = null;
		}
		handleMapChange();
	}

	let updateWatch = null;

	if (updateWatch === null) {
		updateWatch = setInterval(() => {
			updateNavigation();
		}, 100);
	}

	function updateNavigation() {
		navState = airrow.getNavState();
		if (airrow.hasFoundTarget(navState)) {
			clearInterval(updateWatch);
			updateWatch = null;
			$screen = "view";
		}
	}

	function handleMapChange() {
		const map = leafletMap.getMap();
		if (target != null && self != null) {
			map.fitBounds([
				[self.location.lat, self.location.lon],
				[target.location.lat, target.location.lon]
			]);
		}
	}

	let leafletMap;

	onMount(() => {
		targetPromise.then(data => {
			target = data;
			if (!target.location) {
				target.location = {
					lat: 49.02138,
					lon: 12.10181
				}
			}
		});
		handleMapChange();
    });

	onDestroy(() => {
		// important for cleanup
		// do not remove
	});

	function switchScreen(s) {
		$screen = s;
	}

	let navState = {
		direction: 0,
	};
	
</script>

<div class="screen">
	<div class="map">
		<LeafletMap bind:this={leafletMap} options={mapOptions}>
			<TileLayer url={tileUrl} options={tileLayerOptions}/>
			{#if target}
				<Marker icon={iconOptions} latLng={[target.location.lat, target.location.lon]}>
				</Marker>
			{/if}
			{#if self}
				<Marker icon={selfIconOptions} latLng={[self.location.lat, self.location.lon]}>
				</Marker>
			{/if}
		</LeafletMap>
	</div>
	<div class="info">
		<div class="direction">
			<span>
				<img src="/assets/images/nav/arrow.svg" alt="" style="transform: rotate({navState.direction}deg)"/>
			</span>
		</div>
		<div class="distance">
			{#if navState.geo_distance !== undefined}
			<h2>{$_("nav.info.object-distance", { values: { distance: Util.humanDistance(navState.geo_distance) } })}</h2>
				{#if Util.humanDistanceTime(navState.geo_distance) < 2}
				<p>{$_("nav.info.eta-lt-2min")}</p>
				{:else}
				<p>{$_("nav.info.eta", { values: { time: Util.humanDistanceTime(navState.geo_distance) } })}</p>
				{/if}
			{:else}
			<p>{$_("nav.info.wait-for-location")}</p>
			{/if}
		</div>
		<div class="action">
			<button on:click="{() => switchScreen('map')}">{$_("nav.info.stop-navigation")}</button>
		</div>
	</div>
</div>

<style>

	.screen {
		grid-template-rows: 2fr 1fr;
	}
	.map {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.info {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 2;
		grid-row-end: -1;

		position: relative;
		box-shadow: 0 0 1em;
		z-index: 1000;

		background-color: var(--background-color-menu);
		text-align: center;
	}

	.direction {
		position: absolute;
		z-index: 1001;
		width: 12vw;
		height: 12vw;
		padding: 3vw;
		transform: translateY(-50%);
		left: 0;
		right: 0;
		margin: auto;

		border-radius: 100%;
		box-shadow: 0 0 1em;
		background-color: var(--background-color-button);
	}

	.direction img {
		width: 100%;
		height: 100%;
	}

	h2 {
		margin-top: 6vh;
		margin-bottom: 1vh;
	}

	p {
		margin-top: 1vh;
	}

	.action button {
		padding-top: 0em;
		padding-bottom: 0em;
		background: var(--background-color-button-alt);
		color: var(--font-color-button-alt);
		font-size: medium;
		font-weight: normal;
	}
</style>
