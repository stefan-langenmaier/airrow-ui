<script>
	import {fade} from 'svelte/transition'

	import { accepted } from './state.js';
	import * as Util from './util.js'

	let checked = false;

	function handleLegal() {
		if (checked) {
			$accepted = true;
			Util.setLegalVerified(checked);
		}
	}
</script>

<div class="screen" transition:fade="{{duration: 1000}}">
	<div class="legal">
		<div class="input">
			<input type="checkbox" bind:checked={checked} >
		</div>
		{#if !checked}
		<div class="input help">
			<span>👆</span>
		</div>
		<div class="input">
			<span class="highlight"></span>
		</div>
		{/if}

		{#if checked}
		<div class="options" transition:fade="{{duration: 300}}">
			<div class="accept continue">
				<span on:click={handleLegal}>▶️</span>
			</div>
			<div class="accept help">
				<span>👆</span>
			</div>
		</div>
		{:else}
		<div class="options" transition:fade="{{duration: 300}}">
			<iframe src="/legal.html" title="📃"><a href="https://github.com/stefan-langenmaier/airrow/wiki/Legal" target="_blank">📃</a></iframe>
		</div>
		{/if}
	</div>
</div>

<style>
	input[type=checkbox] {
		-webkit-transform: scale(4);
		-o-transform: scale(4);
		transform: scale(4);
		margin: auto;
	}

	iframe {
		width: 80%;
		height: 80%;
		border: 0px;
	}

	.legal {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 3fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: -1;
	}

	.options {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 2;
		grid-row-end: -1;
	}

	.input {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;
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

	.accept {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: -1;
	}

	.continue {
		margin: auto;
		font-size: 40vh;
	}

	.highlight {
		border-radius:50%;
		border: 3em solid white;

		box-sizing: border-box;
		animation: pulsing 2s infinite;
		z-index: -1;

		width: 5em;
		margin: auto;
		height: 5em;
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