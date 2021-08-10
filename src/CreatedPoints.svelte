<script>
	import * as Util from './util.js'

	export let airrow;

	let isDeleting = false;
	let createdPoints = airrow.getCreatedPoints();

	function handleDelete(uuid, data, idx) {
		isDeleting = true;
		airrow.deletePoint(uuid)
			.then(response => {
				isDeleting = false;
				data.points.splice(idx, 1);
			})
			.catch(err => {
				isDeleting = false;
				console.error(err);
			});
	}

</script>

<div class="screen">
	{#if isDeleting}
	<div class="created">
		<span class="loading">⏳</span>
	</div>
	{:else}
	<div class="created">
		{#await createdPoints}
		<span class="loading">⏳</span>
		{:then data}
		<span class="summary">
			<h1>🗺️</h1>
			<div class="table">
				<table>
					{#each data.points as p, i (p.uuid)}
					<tr class="poi" data-id="{p.uuid}"><td>{p.status}</td><td>{Util.humanDistance(p.distance)}</td><td>{Util.mimeToEmoji(p.mimeType)}</td><td on:click={() => handleDelete(p.uuid, data, i)}>❌</td></tr>
					{:else}
					&nbsp;
					{/each}
				</table>
			</div>
		</span>
		{/await}
	</div>
	{/if}
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
