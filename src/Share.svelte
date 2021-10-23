<script>
	import { screen } from './state.js';
	
	export let airrow;

	let sharingFailed = false;

	function share() {
		if (navigator.share) {
			navigator.share({
				title: 'Ärro',
				text: `>${airrow.status}<`,
				url: `${window.location.origin}#${airrow.status}`,
			})
				.then(() => $screen = 'nav')
				.catch((error) => sharingFailed = true);
		} else {
			sharingFailed = true;
		}
	}
</script>

<div class="screen">
	{#if sharingFailed}
	<div class="share">
		<span>❌</span>
	</div>
	{:else}
	<div class="share">
		<span on:click={share}>🔗</span>
	</div>
	{/if}
</div>

<style>
	.share span {
		margin: auto;
		font-size: 35vh;
	}

	.share {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;
	}
</style>
