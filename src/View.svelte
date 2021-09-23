<script>
	import { fade } from 'svelte/transition';
	import { screen } from './state.js';
	import * as Util from './util.js'

	export let airrow;
	let targetPromise = airrow.getTarget(airrow.targetRefCode);

	let rating = "";
	let isUploadingRating = false;
	
	function toggleRating(evt) {
		const targetValue = evt.target.value;
		if (targetValue == rating) {
			rating = "";
		}
	}

	function handleRating(refCode) {
		if (isUploadingRating) {
			return;
		}
		isUploadingRating = true;
		const ratingUpload = airrow.rate(rating, refCode);
		
		ratingUpload.then(() => {
			$screen = 'nav';
		}).catch(() => {
			isUploadingRating = false;
		});
	}
</script>

<div class="screen found" transition:fade={{ duration: 1000 }}>
	{#if isUploadingRating}
	<div class="poi" transition:fade={{ duration: 1000 }}>
		<span class="loading">⏳</span>
	</div>
	{:else}
		{#await targetPromise}
		<div class="poi" transition:fade={{ duration: 1000 }}>
			<span class="loading">⏳</span>
		</div>
		{:then target}
		{#if rating === ""}
		<div class="poi" transition:fade={{ duration: 1000 }}>
			{#if airrow.hasTargetDownloadLink(target)}
			<span>
				{#if Util.isImage(target.mimeType)}
				<!-- svelte-ignore a11y-missing-attribute -->
				<img class="media" src="{airrow.getTargetDownloadLink(target)}"/>
				{:else if Util.isAudio(target.mimeType)}
				<!-- svelte-ignore a11y-media-has-caption -->
				<audio class="media" controls src="{airrow.getTargetDownloadLink(target)}" />
				{:else if Util.isVideo(target.mimeType)}
				<!-- svelte-ignore a11y-media-has-caption -->
				<video class="media" controls src="{airrow.getTargetDownloadLink(target)}" />
				{:else if Util.isModel(target.mimeType)}
				<model-viewer src="{airrow.getTargetDownloadLink(target)}" ar ar-modes="webxr scene-viewer quick-look" auto-rotate camera-controls></model-viewer>
				{:else if Util.isLink(target.mimeType)}
					{#await Util.get(airrow.getTargetDownloadLink(target))}
					<span class="loading">⏳</span>
					{:then link}
						{#if Util.isYoutubeLink(link)}
						<iframe title="inlined-video" src="{link}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
						{:else}
						<a href="{link}" target="_blank">🔗↗️</a>
						{/if}
					{/await}
				{:else}
				<span class="target">🏁</span>
				{/if}
			</span>
			{:else}
			<span class="target">🏁</span>
			{/if}
		</div>
		{:else}
		<div class="poi" in:fade={{ duration: 1000 }}>
			<span class="continue" on:click={() => handleRating(target.refCode)}>▶️</span>
		</div>
		{/if}
		<div class="rating">
			<span>
				<label>
					<input type="radio" bind:group={rating} value="REPORT" on:click={toggleRating}>
					<span>🚫</span>
				</label>
				
				<label>
					<input type="radio" bind:group={rating} value="DOWN" on:click={toggleRating}>
					<span>👎</span>
				</label>
				
				<label>
					<input type="radio" bind:group={rating} value="UP" on:click={toggleRating}>
					<span>👍</span>
				</label>
			</span>
		</div>
		{:catch error}
		<div class="poi" transition:fade={{ duration: 1000 }}>
			<span class="loading">⚠️</span>
		</div>
		{/await}
	{/if}
</div>

<style>

	.poi {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.rating {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 2;
		grid-row-end: -1;
	}

	.target {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.poi span {
		margin: auto;
	}

	span.target {
		font-size: 40vh;
	}

	.rating span {
		margin: auto;
		font-size: 5vh;
		padding: 1vh;
	}

	.rating input[type=radio] {
  		display: none;
	}

	input[type="radio"]:checked + span {
  		background-color: rgba(0,0,0,.5);
	}

	.rating label {
		display: inline-block;
	}

	.continue {
		font-size: 40vh;
	}

	.loading {
		font-size: 40vh;
	}

	.poi a {
		font-size: 20vh;
	}

	.found {
		background: radial-gradient(circle at 50%, lightgrey, orange 100%);;
	}

	.poi span img {
		max-width: 90vw;
		max-height: 50vh;
	}

	.poi span iframe {
		width: 90vw;
		height: 50vh;
	}

	.poi span model-viewer {
		width: 90vw;
		height: 50vh;
	}

	.poi span audio {
		width: 90vw;
	}
</style>
