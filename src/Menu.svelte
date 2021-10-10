<script>
	import { fade } from "svelte/transition";
	import { screen } from './state.js';

	let isOpen = false;

	function toggleSubMenu() {
		isOpen = !isOpen;
	}

	function switchScreen(s) {
		isOpen = false;
		$screen = s;
	}

</script>

<nav class="menu">
	<a href="/#" on:click|preventDefault={() => switchScreen('map')} class="menu__link menu__link--active">
		<span class="menu__icon">
			<svg viewBox="0 0 32 32">
				<use xlink:href="/assets/icons/menu/pin.svg#pin"></use>
			</svg>
		</span>
		<span class="menu__text">Karte</span>
	</a>
	<a href="/#" on:click={() => switchScreen('map')} class="menu__link">
		<span class="menu__icon">
			<svg viewBox="0 0 32 32">
				<use xlink:href="/assets/icons/menu/art.svg#art"></use>
			</svg>
		</span>
		<span class="menu__text">Kunstwerk</span>
	</a>
	<a href="/#" on:click={() => switchScreen('map')} class="menu__link">
		<span class="menu__icon">
			<svg viewBox="0 0 32 32">
				<use xlink:href="/assets/icons/menu/donumenta.svg#donumenta"></use>
			</svg>
		</span>
		<span class="menu__text">donumenta</span>
	</a>
	<a href="/#" on:click={() => switchScreen('map')} class="menu__link">
		<span class="menu__icon">
			<svg viewBox="0 0 32 32">
				<use xlink:href="/assets/icons/menu/news.svg#news"></use>
			</svg>
		</span>
		<span class="menu__text">News</span>
	</a>
	<a href="/#" on:click|preventDefault={() => toggleSubMenu()} class="menu__link" class:menu__link--active="{isOpen}">
		<span class="menu__icon">
		{#if isOpen}
			<svg viewBox="0 0 32 32">
				<use xlink:href="/assets/icons/menu/more.svg#open"></use>
			</svg>
		{:else}
			<svg viewBox="0 0 32 32">
				<use xlink:href="/assets/icons/menu/more.svg#closed"></use>
			</svg>
		{/if}
		</span>
		<span class="menu__text">Weitere Infos</span>
	</a>
</nav>
{#if isOpen}
<div class="canvas" on:click={() => toggleSubMenu()}></div>
<nav class="submenu">
	<div class="submenu__links">
		<div class="languages">
			<a href="/#">
				<span class="language__icon">🇩🇪</span>
			</a>
			<a href="/#">
				<span class="language__icon">🇬🇧</span>
			</a>
		</div>
		<hr />
		<div class="subpages">
			<a href="/#">
				<span class="subpage__icon"><img src="/assets/icons/subpage/sponsors.svg" alt="Sponsoren"/></span>
				<span class="subpage__text">Sponsoren</span>
			</a>
			<a href="/#">
				<span class="subpage__icon"><img src="/assets/icons/subpage/imprint.svg" alt="Impressum"/></span>
				<span class="subpage__text">Impressum</span>
			</a>
			<a href="/#">
				<span class="subpage__icon"><img src="/assets/icons/subpage/legal.svg" alt="Datenschutz &amp; AGB"/></span>
				<span class="subpage__text">Datenschutz &amp; AGB</span>
			</a>
		</div>
		<hr />
		<div class="social">
			<a href="/#">
				<span class="social__icon"><img src="/assets/icons/social/instagram.svg" alt="Instagram"/></span>
			</a>
			<a href="/#">
				<span class="social__icon"><img src="/assets/icons/social/facebook.svg" alt="Instagram"/></span>
			</a>
		</div>
	</div>
</nav>
{/if}

<style>
	.menu {
		display: flex;

		flex-grow: 1;

		box-shadow: 0 0 3px rgba(0, 0, 0, 1);
		z-index: 1500;
		position: relative;

		overflow-x: auto;

		background-color: var(--background-color-menu);
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

	.canvas {
		position: absolute;
		z-index: 1000;
		top: 0px;
		height: 100vh;
		width: 100vw;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.submenu {
		position: absolute;
		z-index: 1001;
		right: 1em;
		width: 60%;
		transform: translateY(-100%);
	}

	.submenu__links {
		border-top-left-radius: 1em;
		border-top-right-radius: 1em;
		padding: 1em;
		box-shadow: 0 0 1em;
		background-color: var(--background-color-submenu);
	}

	.languages a {
		text-decoration: none;
		font-size: 2em;
		padding-right: 0.2em;
	}

	.subpages {
		display: flex;
		flex-direction: column;
		gap: 0.2em;
	}

	.subpages a {
		text-decoration: none;
		font-size: 1.5em;
	}

	.subpages img {
		vertical-align: middle;
	}

	.subpage__text {
		color: var(--font-color);
	}

	hr {
		color: var(--background-color);
	}

</style>
