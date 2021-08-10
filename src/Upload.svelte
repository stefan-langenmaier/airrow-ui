<script>
	import {fade} from 'svelte/transition'
	
	import { screen } from './state.js';
	
	export let airrow;

	let fileInput;

	let fileSelected = false;
	let isUploading = false;

	function handleUpload() {
		if (!fileSelected) return;
		isUploading = true;
		airrow.uploadPOI(fileInput)
			.then(response => {
				isUploading = false;
				$screen = "nav";
			})
			.catch(err => {
				isUploading = false;
			});
	}

	function handleFileSelection(e) {
		if (e.target.files.length >= 0) {
			fileSelected = true;
		} else {
			fileSelected = false;
		}
	}

</script>

<div class="screen">
	<div class="upload">
		<div class="input">
			<span on:click={() => fileInput.click()}>📎</span>
			<input type="file" bind:this={fileInput} on:change={handleFileSelection}>
		</div>
		{#if isUploading}
		<div class="options" transition:fade="{{duration: 300}}">
			<span>⏳</span>
		</div>
		{:else}
		<div class="options">
			<span on:click={handleUpload} class:disabled={!fileSelected}>🔼</span>
		</div>
		{/if}
	</div>
</div>

<style>

	.input input[type=file] {
		display: none;
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

	.input span {
		margin: auto;
		font-size: 15vh;
	}

	.upload {
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
