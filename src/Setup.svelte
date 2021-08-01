<script>
	import { fade } from "svelte/transition";
	import { configured } from './state.js';
	
	export let airrow; 

	let hasGeoPermission = false;
	let hasOrientationPermission = false
	let verifyingGeoPermission = false;
	let verifyingOrientationPermission = false;
	let preparingUI = false;

	airrow.checkGeoPermission(updateGeoPermission);
	airrow.checkOrientationPermission(updateOrientationPermission);

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

<div class="screen" transition:fade={{ duration: 1000 }}>
	{#if !hasGeoPermission}
		{#if verifyingGeoPermission}
			<div class="test">
				<span>⏳</span>
			</div>
		{:else}
			<div class="test">
				<span class="highlight" />
			</div>
			<div class="test">
				<span class="trigger" on:click={checkGeoPermission}>🛰️</span>
			</div>
			<div class="test help">
				<span on:click={checkGeoPermission}>👆</span>
			</div>
		{/if}
	{:else if !hasOrientationPermission}
		{#if verifyingOrientationPermission}
			<div class="test">
				<span>⏳</span>
			</div>
		{:else}
			<div class="test">
				<span class="highlight" />
			</div>
			<div class="test">
				<span class="trigger" on:click={checkOrientationPermission}>🧭</span>
			</div>
			<div class="test help">
				<span on:click={checkOrientationPermission}>👆</span>
			</div>
		{/if}
	{:else}
		{#if preparingUI}
			<div class="test">
				<span>⏳</span>
			</div>
		{:else}
			<div class="test">
				<span class="highlight" />
			</div>
			<div class="test">
				<span class="trigger" on:click={prepareUI}>🚀</span>
			</div>
			<div class="test help">
				<span on:click={prepareUI}>👆</span>
			</div>
		{/if}
	{/if}
</div>

<style>
	.test {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.test span {
		font-size: 30vh;
		margin: auto;
	}

	.help {
		margin: auto;
	}

	.help span {
		font-size: 10vh;
		z-index: 1;
		animation-name: show-help;
		animation-delay: 3s;
		animation-duration: 12s;
		animation-iteration-count: infinite;

		transform: translate(200%, 0%);
		opacity: 0;
	}

	@keyframes show-help {
		0% {
			transform: translate(200%, 0%);
			opacity: 1;
		}
		10% {
			transform: translate(50%, 0%);
			opacity: 1;
		}
		11% {
			opacity: 0;
		}
		12% {
			transform: translate(200%, 0%);
			opacity: 0;
		}
		100% {
			transform: translate(200%, 0%);
			opacity: 0;
		}
	}

	.highlight {
		border-radius: 50%;
		border: 0.8em solid white;

		box-sizing: border-box;
		animation: pulsing 2s infinite;
		z-index: -1;
	}

	@keyframes pulsing {
		0% {
			transform: scale(0);
			opacity: 1;
		}
		70% {
			transform: scale(1);
			opacity: 0;
		}
		100% {
			transform: scale(0);
			opacity: 0;
		}
	}
</style>
