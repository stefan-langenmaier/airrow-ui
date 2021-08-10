<script>
	import * as Util from './util.js'

	export let airrow;

	let createdPoints = airrow.getCreatedPoints();
</script>

<div class="screen">
	<div class="created">
		{#await createdPoints}
		<span class="loading">⏳</span>
		{:then data}
		<span class="summary">
			<h1>🗺️</h1>
			<div class="table">
				<table>
					{#each data.points as p (p.uuid)}
					<tr class="poi" data-id="{p.uuid}"><td>{p.status}</td><td>{Util.humanDistance(p.distance)}</td><td>{Util.mimeToEmoji(p.mimeType)}</td></tr>
					{:else}
					No location yet
					{/each}
				</table>
			</div>
		</span>
		{/await}
	</div>
</div>

<style>

	.created {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.created span.summary {
		margin: auto;
	}

	h1 {
		text-align: center;
		font-size: 15vh;
		margin: 0.2em;
	}

	.table {
		max-height: 50vh;
		overflow: scroll;
	}

	table {
		font-size: 5vh;
	}

	.created span.loading {
		font-size: 30vh;
		margin: auto;
	}

</style>
