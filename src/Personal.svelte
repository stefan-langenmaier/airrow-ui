<script>
	export let airrow;

	let personal = airrow.getPersonal();
</script>

<div class="screen">
	<div class="personal">
		{#await personal}
		<span class="loading">⏳</span>
		{:then data}
		<span class="summary">
			<h1>📊</h1>
			<ul>
				<li>👣&nbsp;{data.trajectoryPoints}</li>
				<li>🗺️&nbsp;{data.pointsPoints}</li>
				<li>🚦&nbsp;{data.ratingsPoints}</li>
			</ul>
		</span>
		{/await}
	</div>
</div>

<style>

	.personal {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.personal span.summary {
		margin: auto;
	}

	h1 {
		text-align: center;
		font-size: 20vh;
		margin: 0.2em;
	}

	ul {
		list-style: none;
		padding: 0px;
	}

	li {
		font-size: 7vh;
	}

	.personal span.loading {
		font-size: 30vh;
		margin: auto;
	}

</style>
