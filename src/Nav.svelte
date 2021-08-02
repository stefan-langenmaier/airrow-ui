<script>
	import { fade } from 'svelte/transition';
	import * as Util from './util.js'

	export let airrow;

	let navState = {
		direction: 0,
	};

	let status = airrow.status;
	let rating = "";
	let isUploadingRating = false;
	
	let updateWatch = null;

	resetNavigation();

	function updateNavigation() {
		navState = airrow.getNavState();
		if (airrow.hasFoundTarget(navState)) {
			clearInterval(updateWatch);
			updateWatch = null;
		}
	}

	function toggleRating(evt) {
		const targetValue = evt.target.value;
		if (targetValue == rating) {
			rating = "";
		}
	}

	function resetNavigation() {
		airrow.resetPositionState();
		rating = "";
		navState = {
			direction: 0,
		};
		updateNavigation();
		if (updateWatch === null) {
			updateWatch = setInterval(() => {
				updateNavigation();
			}, 100);
		}
		isUploadingRating = false;
	}

	function handleRating() {
		if (isUploadingRating) {
			return;
		}
		isUploadingRating = true;
		const ratingUpload = airrow.rate(rating, navState.target.refCode);
		
		ratingUpload.then(() => {
			resetNavigation();
		}).catch(() => {
			resetNavigation();
		});
	}

	$: {
		status = Util.filterEmojiInput(status);
		airrow.status = status;
	}

</script>

<div class="screen" class:found={airrow.hasFoundTarget(navState)} transition:fade={{ duration: 1000 }}>
	{#if isUploadingRating}
	<div class="poi" transition:fade={{ duration: 1000 }}>
		<span class="loading">⏳</span>
	</div>
	{:else} 
		{#if airrow.hasFoundTarget(navState)}
			{#if rating === ""}
			<div class="poi" transition:fade={{ duration: 1000 }}>
				{#if airrow.hasDownloadLink(navState)}
				<span>
					{#if Util.isImage(navState.target.mimeType)}
					<img class="media" src="{airrow.getDownloadLink(navState)}" alt="" />
					{:else if Util.isAudio(navState.target.mimeType)}
					<!-- svelte-ignore a11y-media-has-caption -->
					<audio class="media" controls src="{airrow.getDownloadLink(navState)}" />
					{:else if Util.isVideo(navState.target.mimeType)}
					<!-- svelte-ignore a11y-media-has-caption -->
					<video class="media" controls src="{airrow.getDownloadLink(navState)}" />
					{:else if Util.isModel(navState.target.mimeType)}
					<model-viewer src="{airrow.getDownloadLink(navState)}" ar ar-modes="webxr scene-viewer quick-look" auto-rotate camera-controls></model-viewer>
					{:else if Util.isLink(navState.target.mimeType)}
						{#await Util.get(airrow.getDownloadLink(navState))}
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
				<span class="continue" on:click={handleRating}>▶️</span>
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
		{:else}
		<div class="nav">
			<div class="target">
				{#if navState.target && navState.target.status}
				<span>{navState.target.status}</span>
				{:else}
				<span class="inactive">🎯</span>
				{/if}
			</div>
			<div class="direction">
				<span style="transform: rotate({navState.direction}deg)">ˆ</span>
			</div>
			<div class="status">
				<span>
					<input type="text" bind:value={status} placeholder="🗣️" size="5"/>
				</span>
			</div>
		</div>
		<div class="info">
			{#if navState.geo_distance !== undefined}
			<span>{Util.humanDistance(navState.geo_distance)}</span>
			{/if}
		</div>
		{/if}
	{/if}
</div>

<style>
	.nav {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 3fr 2fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.info {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 2;
		grid-row-end: -1;
	}

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

	.target span {
		font-size: 5vh;
		margin: auto;
	}

	.direction {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 2;
		grid-row-end: 3;
	}

	.direction span {
		font-size: 25vh;
		margin: auto;
	}

	.status {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 3;
		grid-row-end: -1;
	}

	.status span {
		font-size: 5vh;
		margin: auto;
	}

	.info span {
		font-size: 4vh;
		margin: auto;
	}

	.inactive {
		opacity: 0.2;
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
