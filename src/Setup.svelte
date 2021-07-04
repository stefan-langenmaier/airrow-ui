<script>
	import { fade } from "svelte/transition";
	import { configured } from './state.js';
	
	export let airrow; 

	let hasGeoPermission = false;
	let verifyingGeoPermission = false;
	let preparingUI = false;

	airrow.checkGeoPermissions(updateGeoPermission);

	function updateGeoPermission(hasPermission) {
		verifyingGeoPermission = false;
		hasGeoPermission = hasPermission;
		if (hasGeoPermission) {
			airrow.start();
		}
	}

	function checkGeoPermissions() {
		verifyingGeoPermission = true;
		airrow.start();
	}

	function prepareUI() {
		preparingUI = true;
		airrow.prepareUI(updateUI);
	}

	function updateUI(isReady) {
		preparingUI = false;
		if (isReady) {
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
				<span class="trigger" on:click={checkGeoPermissions}>🛰️</span>
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
