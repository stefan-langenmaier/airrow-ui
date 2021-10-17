<script>
	import { _ } from 'svelte-i18n';

	import { configured } from './state.js';
	
	export let airrow; 

	let hasGeoPermission = false;
	let hasOrientationPermission = false;
	let hasSeenCoronaWarning = false
	let verifyingGeoPermission = false;
	let verifyingOrientationPermission = false;
	let preparingUI = false;

	airrow.checkGeoPermission(updateGeoPermission);
	airrow.checkOrientationPermission(updateOrientationPermission);

	function checkCoronaWarning() {
		hasSeenCoronaWarning = true;
	}

	function updateGeoPermission(hasPermission) {
		verifyingGeoPermission = false;
		hasGeoPermission = hasPermission;
		if (hasGeoPermission) {
			airrow.startGeo();
		}
	}

	function checkGeoPermission() {
		verifyingGeoPermission = true;
		airrow.startGeo();
	}

	function updateOrientationPermission(hasPermission) {
		verifyingOrientationPermission = false;
		hasOrientationPermission = hasPermission;
		if (hasOrientationPermission) {
			airrow.startOrientation();
		}
	}

	function checkOrientationPermission() {
		verifyingOrientationPermission = true;
		airrow.startOrientation();
	}

	function prepareUI() {
		preparingUI = true;
		airrow.prepareUI(updateUI);
	}

	function updateUI(isReady) {
		preparingUI = false;
		if (isReady) {
			airrow.startCompass();
			$configured = isReady;
		}
	}

</script>

<div class="screen">
	{#if !hasSeenCoronaWarning}
		<div class="step">
			<div class="header">
				<img src="/assets/icons/setup/corona.svg" alt="GPS" />
			</div>
			<div class="description">
				<h1>{$_('corona.title')}</h1>

				<p>{$_('corona.description.warning')}</p>
				<p>{$_('corona.description.vaccination')}</p>
				<p>{$_('corona.description.protection')}</p>
				<ul>
					<li>{$_('corona.description.p1')}</li>
					<li>{$_('corona.description.p2')}</li>
					<li>{$_('corona.description.p3')}</li>
					<li>{$_('corona.description.p4')}</li>
					<li>{$_('corona.description.p5')}</li>
				</ul>
				<p>{$_('corona.description.join')}</p>
			</div>
			<div class="nav">
				<button on:click="{checkCoronaWarning}">Okay</button>
			</div>
		</div>
	{:else if !hasGeoPermission}
		<div class="step">
			<div class="header">
				<img src="/assets/icons/setup/gps.svg" alt="GPS" />
			</div>
			<div class="description">
				<h1>GPS</h1>

				<p>
					Um dir das größtmögliche Erlebnis zu bieten, welchseln wir in den Fullscreen Modus, in dem dir die ganze Bildschirmfläche zur Verfügung steht.
				</p>
			</div>
			<div class="nav">
				<button on:click="{checkGeoPermission}">GPS aktivieren</button>
			</div>
		</div>
	{:else if !hasOrientationPermission}
		<div class="step">
			<div class="header">
				<img src="/assets/icons/setup/compass.svg" alt="Kompass" />
			</div>
			<div class="description">
				<h1>Kompass</h1>

				<p>
					Um dir das größtmögliche Erlebnis zu bieten, welchseln wir in den Fullscreen Modus, in dem dir die ganze Bildschirmfläche zur Verfügung steht.
				</p>
			</div>
			<div class="nav">
				<button on:click="{checkOrientationPermission}">Kompass aktivieren</button>
			</div>
		</div>
	{:else}
		<div class="step">
			<div class="header fullscreen">
				<img src="/assets/icons/setup/fullscreen.svg" alt="Fullscreen" />
			</div>
			<div class="description">
				<h1>Wechsel in den Fullscreen Modus</h1>

				<p>
					Um dir das größtmögliche Erlebnis zu bieten, welchseln wir in den Fullscreen Modus, in dem dir die ganze Bildschirmfläche zur Verfügung steht.
				</p>
			</div>
			<div class="nav">
				<button on:click="{prepareUI}">Fullscreen starten</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.step {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 3fr 4fr 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: -1;

		background-image: url("/assets/images/background-texture-map.png");
		background-size: cover;
		background-position: center;
	}

	.description {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 2;
		grid-row-end: 3;

		max-height: calc(var(--vh, 1vh) * 40);
		overflow: scroll;
	}

	.header {
		display: flex;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.header img {
		margin: auto;
	}

	.nav {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 3;
		grid-row-end: -1;
		
		margin: auto;
	}

	.nav button {
		border-radius: 1.5em;
		color: var(--font-color-button);
		background-color: var(--background-color-button);
		padding: 1em;
		font-size: large;
	}
</style>
