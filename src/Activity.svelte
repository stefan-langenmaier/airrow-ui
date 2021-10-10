<script>
	import { screen } from './state.js';

	import Map from './Map.svelte';
	import Nav from './Nav.svelte';
	import View from './View.svelte';
	import List from './List.svelte';
	import Details from './Details.svelte';
	import Donumenta from './Donumenta.svelte';
	import News from './News.svelte';
	import Sponsors from './Sponsors.svelte';

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
<Donumenta airrow={airrow} />
{:else if $screen == 'news'}
<News airrow={airrow} />
{:else if $screen == 'sponsors'}
<Sponsors airrow={airrow} />
{/if}


<style>
</style>
