<script>
	import { _ } from 'svelte-i18n';
	
	import Menu from './Menu.svelte';
	import Preview from './Preview.svelte';

	export let airrow;

	const position = {
		coords: {
			latitude: 49.02138,
			longitude: 12.10181
		}
	};
	let markers = airrow.getPublicPoints(position);
</script>

<div class="screen">
	<div class="details">
		<div class="details__heading">
			<h1>Alle Kunstwerke</h1>
		</div>

		<div class="details__list">
			{#await markers then data}
				{#each data.points as m}
				<Preview marker={m} airrow={airrow} />
				{/each}
			{/await}
		</div>
	</div>
	<div class="menu">
		<Menu />
	</div>
</div>

<style>
	.details {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: -1;
	}

	.details__list {
		max-height: calc(var(--vh, 1vh) * 80);
		overflow: scroll;
	}
</style>
