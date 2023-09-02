<script>
	import { _, locale } from 'svelte-i18n';

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
	<a href="/#" on:click|preventDefault={() => switchScreen('map')} class="menu__link" class:menu__link--active="{$screen === 'map'}">
		<span class="menu__icon">
			<svg viewBox="0 0 32 32">
				<use xlink:href="/assets/icons/menu/pin.svg#pin"></use>
			</svg>
		</span>
		<span class="menu__text">{$_('menu.main.map')}</span>
	</a>
	<a href="/#" on:click={() => switchScreen('list')} class="menu__link" class:menu__link--active="{$screen === 'list'}">
		<span class="menu__icon">
			<svg viewBox="0 0 32 32">
				<use xlink:href="/assets/icons/menu/art.svg#art"></use>
			</svg>
		</span>
		<span class="menu__text">{$_('menu.main.objects')}</span>
	</a>
	<a href="/#" on:click={() => switchScreen('donumenta')} class="menu__link" class:menu__link--active="{$screen === 'donumenta'}">
		<span class="menu__icon">
			{#if $screen === 'donumenta'}
			<svg viewBox="0 0 32 32">
				<use xlink:href="/assets/icons/menu/donumenta.svg#active"></use>
			</svg>
			{:else}
			<svg viewBox="0 0 32 32">
				<use xlink:href="/assets/icons/menu/donumenta.svg#donumenta"></use>
			</svg>
			{/if}
		</span>
		<span class="menu__text">{$_('menu.main.donumenta')}</span>
	</a>
	<a href="https://www.donumenta.de/" target="_blank" rel="noreferrer" class="menu__link">
		<span class="menu__icon">
			<svg viewBox="0 0 32 32">
				<use xlink:href="/assets/icons/menu/news.svg#news"></use>
			</svg>
		</span>
		<span class="menu__text">{$_('menu.main.news')}</span>
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
		<span class="menu__text">{$_('menu.main.more')}</span>
	</a>
</nav>
{#if isOpen}
<div class="canvas" on:click={() => toggleSubMenu()}></div>
<nav class="submenu">
	<div class="submenu__links">
		<div class="languages">
			<a href="/#" on:click="{() => locale.set('de')}">
				<span class="language__icon">🇩🇪</span>
			</a>
			<a href="/#" on:click="{() => locale.set('en')}">
				<span class="language__icon">🇬🇧</span>
			</a>
		</div>
		<hr />
		<div class="subpages">
			<a href="/#" on:click={() => switchScreen('sponsors')}>
				<span class="subpage__icon"><img src="/assets/icons/subpage/sponsors.svg" alt="{$_('menu.submenu.sponsors')}"/></span>
				<span class="subpage__text">{$_('menu.submenu.sponsors')}</span>
			</a>
			<a href="/#" on:click={() => switchScreen('corona')}>
				<span class="subpage__icon"><img src="/assets/icons/subpage/corona.svg" alt="{$_('menu.submenu.corona')}"/></span>
				<span class="subpage__text">{$_('menu.submenu.corona')}</span>
			</a>
			<a href="/#" on:click={() => switchScreen('imprint')}>
				<span class="subpage__icon"><img src="/assets/icons/subpage/imprint.svg" alt="{$_('menu.submenu.imprint')}"/></span>
				<span class="subpage__text">{$_('menu.submenu.imprint')}</span>
			</a>
			<a href="https://www.donumenta.de/info/impressum-und-datenschutz/#c565" target="_blank" rel="noreferrer">
				<span class="subpage__icon"><img src="/assets/icons/subpage/legal.svg" alt="{$_('menu.submenu.legal')}"/></span>
				<span class="subpage__text">{$_('menu.submenu.legal')}</span>
			</a>
		</div>
		<hr />
		<div class="social">
			<a href="https://instagram.com" target="_blank" rel="noreferrer">
				<span class="social__icon"><img src="/assets/icons/social/instagram.svg" alt="Instagram"/></span>
			</a>
			<a href="https://facebook.com" target="_blank" rel="noreferrer">
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
		z-index: 1001;
		top: 0px;
		height: calc(var(--vh, 1vh) * 100);
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
</style>
