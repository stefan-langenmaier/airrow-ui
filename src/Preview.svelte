<script>
	import { _ } from 'svelte-i18n';
	import { screen } from './state.js';

	import * as Util from './util.js';

	function switchScreen(s) {
		$screen = s;
	}

	export let marker;
</script>

<div class="details__element" on:click={() => switchScreen('details')}>
	<div class="details__action">
		<div class="details__favorite">
			<img src="/assets/icons/preview/like.svg" alt="Markieren" />
		</div>
	</div>
	<div class="details__teaser"></div>
	<div class="details__description">
		<div class="details__about">
			<div class="details__title">
				<h2>echo on survival</h2>
			</div>
			<div class="details__artist">
				<p>Barbara Sophie Höcherl</p>
			</div>
		</div>
		<div class="details__distance">{Util.humanDistance(marker.distance)} &gt;</div>
	</div>
</div>

<style>
	.details__element {
		position: relative;

		margin-left: 1em;
		margin-right: 1em;
		margin-bottom: 3em;
	}

	.details__teaser {
		background-image: url('/assets/images/list/preview-default.jpg');
		background-size: cover;
		background-position: center;

		height: 30vh;

		border-top-left-radius: 1em;
		border-top-right-radius: 1em;
	}

	.details__description {
		display: grid;
		grid-template-columns: 4fr 1fr;
		grid-template-rows: 1fr;

		padding-top: 1em;

		background-color: white;

		border-bottom-left-radius: 1em;
		border-bottom-right-radius: 1em;
	}

	.details__about {
		padding-left: 1em;
	}

	.details__title h2 {
		margin-top: 0em;
		margin-bottom: 0em;
	}

	.details__artist p {
		margin-top: 0em;
	}

	.details__distance {
		color: var(--font-color-normal);
	}

	.details__action {
		position: absolute;
		right: 0em;
		margin: 0.5em;
	}
</style>
