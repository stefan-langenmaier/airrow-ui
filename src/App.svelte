<script>
	import { accepted, booted, configured } from './state.js';

	import { Airrow } from "./airrow.js";
	let airrow = new Airrow();
	
	import Boot from './Boot.svelte';
	import Legal from './Legal.svelte';
	import Setup from './Setup.svelte';
	import Activity from './Activity.svelte';

</script>

<main>
	{#if !$booted}
	<Boot airrow={airrow} />
	{:else if !$accepted}
	<Legal />
	{:else if !$configured}
	<Setup airrow={airrow} />
	{:else}
	<Activity airrow={airrow} />
	{/if}
</main>

<style>
	main {
		height: 100vh; /* Fallback for browsers that do not support Custom Properties */
		height: calc(var(--vh, 1vh) * 100);
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}

	:global(.screen) {
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
		grid-template-rows: 5fr 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: -1;
	}
</style>