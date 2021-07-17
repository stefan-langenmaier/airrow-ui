<script>
	import { fade } from 'svelte/transition';
	
	import { screen } from './state.js';

	import Menu from './Menu.svelte';
	import Nav from './Nav.svelte';
	import Personal from './Personal.svelte';
	import DeleteAccount from './DeleteAccount.svelte';
	import Share from './Share.svelte';

	export let airrow; 
</script>

<div class="screen" transition:fade={{ duration: 1000 }}>
	<Menu />
	{#if $screen == 'nav'}
	<Nav airrow={airrow} />
	{:else if $screen == 'personal'}
	<Personal airrow={airrow} />
	{:else if $screen == 'share'}
	<Share airrow={airrow} />
	{:else if $screen == 'delete'}
	<DeleteAccount airrow={airrow} />
	{/if}
</div>

<style>
</style>
