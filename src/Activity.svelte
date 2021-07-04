<script>
	import { fade } from 'svelte/transition';
	import Nav from './Nav.svelte';
	import Menu from './Menu.svelte';

	export let airrow; 
</script>

<div class="screen" transition:fade={{ duration: 1000 }}>
	<Menu />
	<Nav airrow={airrow} />
</div>

<style>
</style>
