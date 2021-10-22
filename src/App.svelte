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
		grid-template-columns: 1fr;
		grid-template-rows: 8fr 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: -1;
	}

	:global(:root){
		--background-color: #e4e9ee;
		--background-color-menu: #f2f4f8;
		--background-color-submenu: #ffffff;
		--background-color-button: #0093d7;
		--background-color-button-alt: #f2f4f8;
		--font-color:  #8d969c;
		--font-color-active: #0093d7;
		--font-color-button: #ffffff;
		--font-color-button-alt: #80898f;
		--font-color-bold: #5d5f63;
		--font-color-normal: #80898f;
	}

	:global(body){
		background-color: var(--background-color);
	}

	:global(h1){
		color: var(--font-color-bold);
		margin-left: 4vw;
		margin-right: 4vw;
	}

	:global(h2){
		color: var(--font-color-bold);
		margin-left: 4vw;
		margin-right: 4vw;
	}

	:global(p) {
		color: var(--font-color-normal);
		margin-left: 4vw;
		margin-right: 4vw;
	}

	:global(a) {
		color: var(--font-color-active);
	}

	:global(.menu) {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 2;
		grid-row-end: -1;

		display: flex;
	}

	:global(ul) {
		color: var(--font-color-normal);
	}

	:global(hr) {
		color: var(--background-color);
	}

	:global(button) {
		border-radius: 1.5em;
		color: var(--font-color-button);
		background-color: var(--background-color-button);
		padding: 1em;
		font-size: large;
		font-weight: bold;
	}
</style>