<script>
	import { screen } from './state.js';

	import Map from './Map.svelte';
	import Nav from './Nav.svelte';
	import View from './View.svelte';
	import List from './List.svelte';
	import Details from './Details.svelte';
	import Donumenta from './Donumenta.svelte';
	import Sponsors from './Sponsors.svelte';
	import Corona from './Corona.svelte';
	import Imprint from './Imprint.svelte';

	export let airrow; 
</script>

{#if $screen == 'map'}
<Map airrow={airrow} />
{:else if $screen == 'nav'}
<Nav airrow={airrow} />
{:else if $screen == 'view'}
<View airrow={airrow} />
{:else if $screen == 'list'}
<List airrow={airrow} />
{:else if $screen == 'details'}
<Details airrow={airrow} />
{:else if $screen == 'donumenta'}
<Donumenta />
{:else if $screen == 'sponsors'}
<Sponsors />
{:else if $screen == 'corona'}
<Corona />
{:else if $screen == 'imprint'}
<Imprint />
{/if}


<style>
</style>
