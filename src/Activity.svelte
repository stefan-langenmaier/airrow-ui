<script>
	import { fade } from 'svelte/transition';
	
	import { screen } from './state.js';

	import Map from './Map.svelte';
	import Nav from './Nav.svelte';
	import View from './View.svelte';

	export let airrow; 
</script>

{#if $screen == 'map'}
<Map airrow={airrow} />
{:else if $screen == 'nav'}
<Nav airrow={airrow} />
{:else if $screen == 'view'}
<View airrow={airrow} />
{/if}


<style>
</style>
