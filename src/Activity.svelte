<script>
	import { fade } from 'svelte/transition';
	
	import { screen } from './state.js';

	import Menu from './Menu.svelte';
	import Map from './Map.svelte';
	import Nav from './Nav.svelte';
	import Personal from './Personal.svelte';
	import DeleteAccount from './DeleteAccount.svelte';
	import Share from './Share.svelte';
	import Upload from './Upload.svelte';
	import CreatedPoints from './CreatedPoints.svelte';
	import View from './View.svelte';

	export let airrow; 
</script>

<div class="screen" transition:fade={{ duration: 1000 }}>
	<Menu />
	{#if $screen == 'map'}
	<Map airrow={airrow} />
	{:else if $screen == 'nav'}
	<Nav airrow={airrow} />
	{:else if $screen == 'personal'}
	<Personal airrow={airrow} />
	{:else if $screen == 'share'}
	<Share airrow={airrow} />
	{:else if $screen == 'delete'}
	<DeleteAccount airrow={airrow} />
	{:else if $screen == 'upload'}
	<Upload airrow={airrow} />
	{:else if $screen == 'createdPoints'}
	<CreatedPoints airrow={airrow} />
	{:else if $screen == 'view'}
	<View airrow={airrow} />
	{/if}
</div>

<style>
</style>
