<script>
	import { fade } from "svelte/transition";
	import { screen } from './state.js';

	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function switchScreen(s) {
		isOpen = false;
		$screen = s;
	}

</script>

<div class="screen">
	{#if isOpen }
		<div class="menu" transition:fade={{ duration: 1000 }}>
			<div class="list">
				<ul>
					<li on:click={() => switchScreen('nav')}>🧭</li>
					<li on:click={() => switchScreen('personal')}>📊</li>
					<li class="disabled">🏆</li>
					<li class="disabled">📍</li>
					<li class="disabled">🗺️</li>
					<li class="disabled">☁️</li>
					<li on:click={() => switchScreen('share')}>🔗</li>
					
					<li class="seperator">&nbsp;</li>
					<li class="disabled">👤</li>
					<li on:click={() => switchScreen('delete')}>❌</li>
				</ul>
			</div>
		</div>
	{/if}
	<div class="burger">
		<span on:click={toggleMenu}>
			<svg viewBox="0 0 100 100" version="1.1"
				xmlns="http://www.w3.org/2000/svg">
				<rect class="line" x="0" y="25" width="100" height="10"/>
				<rect class="line" x="0" y="50" width="100" height="10"/>
				<rect class="line" x="0" y="75" width="100" height="10"/>
			</svg>
		</span>
	</div>
</div>

<style>
	.line {
		fill: rgba(0, 0, 0, 1);
	}

	.burger span svg {
		padding: 3vh;
		max-height: 10vh;
		max-width: 10vw;
		width: 100%;
		height: 100%;
	}
	.menu {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;

		z-index: 1;
	}

	.list {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: -1;

		background-color: rgba(0, 128, 128, 0.9);
	}
	.burger {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: -1;

		z-index: 1;
	}

	.burger span {
		font-size: 5vh;
		margin: auto;
	}

	.list li {
		font-size: 4vh;
		padding: 0.2em;
		text-align: center;
	}

	.list ul {
		list-style: none;
		padding-left: 0;
	}

	.disabled {
		background-color: rgb(211, 211, 211, 0.5);
		color: grey;
		filter: grayscale(1);
	}

</style>
