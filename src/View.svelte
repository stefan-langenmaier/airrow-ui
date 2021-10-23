<script>
	import { _ } from 'svelte-i18n';
	import '@google/model-viewer';

	import { screen } from './state.js';
	import * as Util from './util.js';

	export let airrow;
	let targetPromise = airrow.getTarget(airrow.targetRefCode);

	function switchScreen(s) {
		$screen = s;
	}
</script>

<div class="screen">
	{#await targetPromise then target}
	<div class="poi">
		{#if airrow.hasTargetDownloadLink(target)}
		<div class="media">
			{#if Util.isImage(target.mimeType)}
			<!-- svelte-ignore a11y-missing-attribute -->
			<img src="{airrow.getTargetDownloadLink(target)}"/>
			{:else if Util.isAudio(target.mimeType)}
			<!-- svelte-ignore a11y-media-has-caption -->
			<audio controls src="{airrow.getTargetDownloadLink(target)}" />
			{:else if Util.isVideo(target.mimeType)}
			<!-- svelte-ignore a11y-media-has-caption -->
			<video controls src="{airrow.getTargetDownloadLink(target)}" />
			{:else if Util.isModel(target.mimeType)}
			<model-viewer src="{airrow.getTargetDownloadLink(target)}" ar ar-modes="webxr scene-viewer quick-look" auto-rotate camera-controls skybox-image="/assets/images/view/model-background-default.jpg" poster="/assets/images/view/preview-default.jpg">
				<button slot="ar-button">{$_("view.media.activate-ar")}</button>
			</model-viewer>
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
		</div>
		{:else}
		<div class="media">🏁</div>
		{/if}
		<div class="action">
			<div class="close" on:click="{() => switchScreen('map')}">
				<img src="/assets/icons/map/close.svg" alt="{$_("view.media.close")}" />
			</div>
		</div>
		<div class="description">
			<div class="description__status">
				<p>{$_("view.description.object-reached")}</p>
			</div>
			<div class="description__title">
				<h1>echo on survival</h1>
			</div>
			<hr />
			<div class="description__action">
				<div class="share">
					<img src="/assets/icons/map/share.svg" alt="{$_("view.description.share")}" />
				</div>
				<div class="like">
					<img src="/assets/icons/map/like.svg" alt="{$_("view.description.like")}" />
				</div>
			</div>
			<div class="description__more">
				<a href="/#" on:click="{() => switchScreen('details')}">
					<img src="/assets/icons/map/info.svg" alt="Mehr" />{$_("view.description.more-about-the-object")}
				</a>
			</div>
		</div>
	</div>
	{/await}
</div>

<style>
	.poi {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: -1;
	}

	.media {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: -1;
	}

	span.target {
		font-size: 40vh;
	}

	.loading {
		font-size: 40vh;
	}

	.media * {
		width: 100vw;
		height: calc(var(--vh, 1vh) * 100);
	}

	.action {
		position: absolute;
		right: 1em;
		display: flex;
	}

	.close {
		margin-top: 0.5em;
	}

	.description {
		position: absolute;

		bottom: 1em;
		margin-left: 1em;
		margin-right: 1em;

		border-radius: 1em;
		background-color: white;
		box-shadow: 0 0 1em;

		width: 100%;
		max-width: 90vw;
	}

	.description__action {
		position: absolute;
		right: 1em;
		display: flex;
	}

	.description__more img {
		vertical-align: middle;
	}

	.description__more {
		padding-left: 1em;
		padding-bottom: 1em;
	}

	.description__status {
		text-align: center;
	}

	.description__status p {
		margin-bottom: 0em;
	}

	.description__title {
		text-align: center;
	}

	.description__title h1 {
		margin-top: 0em;
	}

	.media model-viewer button {
		position: absolute;
		top: 0.5em;
		left: 1em;
		padding: 0.5em;
		max-height: fit-content;
		max-width: fit-content;
		border: 0px;
	}
</style>
