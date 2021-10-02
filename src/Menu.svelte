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

<nav class="menu">
	<a href="#" on:click={() => switchScreen('map')} class="menu__link menu__link--active">
		<span class="menu__icon">
			<svg viewBox="0 0 32 32">
				<use xlink:href="/assets/icons/menu/pin-ref.svg#pin"></use>
			</svg>
		</span>
		<span class="menu__text">Karte</span>
	</a>
	<a href="#" on:click={() => switchScreen('map')} class="menu__link">
		<span class="menu__icon"><img src="/assets/icons/menu/art.svg" alt="Kunstwerk"/></span>
		<span class="menu__text">Kunstwerk</span>
	</a>
	<a href="#" on:click={() => switchScreen('map')} class="menu__link">
		<span class="menu__icon"><img src="/assets/icons/menu/donumenta.svg" alt="Donumenta"/></span>
		<span class="menu__text">donumenta</span>
	</a>
	<a href="#" on:click={() => switchScreen('map')} class="menu__link">
		<span class="menu__icon"><img src="/assets/icons/menu/news.svg" alt="News"/></span>
		<span class="menu__text">News</span>
	</a>
	<a href="#" on:click={() => switchScreen('map')} class="menu__link">
		<span class="menu__icon"><img src="/assets/icons/menu/more.svg" alt="Weitere Infos"/></span>
		<span class="menu__text">Weitere Infos</span>
	</a>
</nav>
<nav class="submenu">
	<div>
		Language
	</div>
	<div>
		Pages
	</div>
	<div>
		Social
	</div>
</nav>

<style>
	.menu {
		display: flex;

		flex-grow: 1;

		box-shadow: 0 0 3px rgba(0, 0, 0, 1);
		/*box-shadow: 0 -5px 10px #333;*/
		z-index: 1000;
		position: relative;

		overflow-x: auto;

	}

	.menu__link {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-grow: 1;

		overflow: hidden;
		white-space: nowrap;

		color: var(--font-color);
		text-decoration: none;
	}

	.menu__link--active {
		color: var(--font-color-active);
	}

	.menu__icon svg {
		height: 2em;
	}

	.submenu {
		position: absolute;
		z-index: 100000;
		right: 0em;
		width: 50%;
		transform: translateY(-100%);
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
