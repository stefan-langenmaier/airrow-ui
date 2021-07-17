<script>
	import {fade} from 'svelte/transition'
	
	import * as Util from './util.js'
	
	export let airrow;

	let checked = false;
	let isDeleting = false;
	
	function handleDeletion() {
		if (checked) {
			isDeleting = true;
			airrow.deleteAccount()
				.then(response => {
					Util.reload();
				})
				.catch(err => {
					Util.reload();
				});
		}
	}
</script>

<div class="screen">
	<div class="deletion">
		<div class="input">
			<input type="checkbox" bind:checked={checked} >
		</div>
		{#if isDeleting}
		<div class="options" transition:fade="{{duration: 300}}">
			<span>⏳</span>
		</div>
		{:else}
		<div class="options">
			<span on:click={handleDeletion} class:disabled={!checked}>❌</span>
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

	.input {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.deletion {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 3fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;
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

	.disabled {
		color: grey;
		filter: grayscale(1);
	}

	.options span {
		margin: auto;
		font-size: 40vh;
	}

</style>
