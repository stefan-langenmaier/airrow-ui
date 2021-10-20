<script>
	import { _ } from 'svelte-i18n';

	import { screen } from './state.js';
	import Menu from './Menu.svelte';

	export let airrow;
	let targetPromise = airrow.getTarget(airrow.targetRefCode);

	let isArtistOpen = true;
	let isIdeaOpen = false;
	let isLocationOpen = false;

	function toggleArtist() {
		isArtistOpen = !isArtistOpen;
	}

	function toggleIdea() {
		isIdeaOpen = !isIdeaOpen;
	}

	function toggleLocation() {
		isLocationOpen = !isLocationOpen;
	}

	function switchScreen(s) {
		$screen = s;
	}
</script>

<div class="screen">
	{#await targetPromise then target}
	<div class="poi">
		<div class="header">
			<div class="header__action">
				<div class="share">
					<img src="/assets/icons/details/share.svg" alt="{$_('details.action.share')}" />
				</div>
				<div class="like">
					<img src="/assets/icons/details/like.svg" alt="{$_('details.action.favorite')}" />
				</div>
			</div>
		</div>
		<div class="action">
			<button on:click="{() => switchScreen('nav')}">{$_('details.action.route')}</button>
			<button on:click="{() => switchScreen('view')}">{$_('details.action.view')}</button>
		</div>
		<div class="description">
			<div class="description__title">
				<h1>echo on survival</h1>
			</div>
			<div class="description__element">
				<div class="description__header" on:click="{toggleArtist}">
					<div class="description__subtitle">
						<img src="/assets/icons/details/artist.svg" alt="" />Barbara Sophie Höcherl
					</div>
					<div class="description__subaction">
						{#if isArtistOpen}
						<img src="/assets/icons/details/down.svg" alt="{$_('details.description.close')}" />
						{:else}
						<img src="/assets/icons/details/open.svg" alt="{$_('details.description.open')}" />
						{/if}
					</div>
				</div>
				<div class:closed="{!isArtistOpen}">
					<hr/>
					<div class="description__content">
						<p>Barbara Sophie Höcherl 
							wurde 1983 in Wörth a.d. 
							Donau geboren und hat an 
							der Ladislav-Sutnar-
							Fakultät in Pilsen 
							Illustration und Grafik 
							studiert. Seit 2012 arbeitet 
							sie hauptberuflich als freischaffende Künstlerin und hat sich seitdem nicht nur als feste Größe etabliert, sondern auch die Herzen des Regensburger Kunstpublikums erobert.
						</p>
					</div>
				</div>
			</div>
			<div class="description__element">
				<div class="description__header" on:click="{toggleIdea}">
					<div class="description__subtitle">
						<img src="/assets/icons/details/idea.svg" alt="" />{$_('details.description.idea')}
					</div>
					<div class="description__subaction">
						{#if isIdeaOpen}
						<img src="/assets/icons/details/down.svg" alt="{$_('details.description.close')}" />
						{:else}
						<img src="/assets/icons/details/open.svg" alt="{$_('details.description.open')}" />
						{/if}
					</div>
				</div>
				<div class:closed="{!isIdeaOpen}">
					<hr/>
					<div class="description__content">
						<p>Barbara Sophie Höcherl 
						wurde 1983 in Wörth a.d. 
						Donau geboren und hat an 
						der Ladislav-Sutnar-
						Fakultät in Pilsen 
						Illustration und Grafik 
						studiert. Seit 2012 arbeitet 
						sie hauptberuflich als freischaffende Künstlerin und hat sich seitdem nicht nur als feste Größe etabliert, sondern auch die Herzen des Regensburger Kunstpublikums erobert.
						</p>
					</div>
				</div>
			</div>
			<div class="description__element ">
				<div class="description__header" on:click="{toggleLocation}">
					<div class="description__subtitle">
						<img src="/assets/icons/details/pin.svg" alt="" />{$_('details.description.location')}
					</div>
					<div class="description__subaction">
						{#if isLocationOpen}
						<img src="/assets/icons/details/down.svg" alt="{$_('details.description.close')}" />
						{:else}
						<img src="/assets/icons/details/open.svg" alt="{$_('details.description.open')}" />
						{/if}
					</div>
				</div>
				<div class:closed="{!isLocationOpen}">
					<hr/>
					<div class="description__content">
						<p>Barbara Sophie Höcherl 
							wurde 1983 in Wörth a.d. 
							Donau geboren und hat an 
							der Ladislav-Sutnar-
							Fakultät in Pilsen 
							Illustration und Grafik 
							studiert. Seit 2012 arbeitet 
							sie hauptberuflich als freischaffende Künstlerin und hat sich seitdem nicht nur als feste Größe etabliert, sondern auch die Herzen des Regensburger Kunstpublikums erobert.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	{/await}
	<div class="menu">
		<Menu />
	</div>
</div>

<style>
	.poi {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 3fr 1fr 5fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: -1;

		max-height: calc(var(--vh, 1vh) * 90);
		overflow: scroll;
	}

	.menu {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 2;
		grid-row-end: -1;
	}

	.header {
		background-image: url('/assets/images/details/preview-default.jpg');
		background-size: cover;
		background-position: center;
		background-color: white;

		position: relative;

		min-height: 30vh;
	}

	.header__action {
		position: absolute;
		bottom: 1em;
		right: 1em;
		display: flex;
	}

	.action {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
		gap: 5vw;
	}

	.description__element {
		background-color: white;
		border-radius: 1em;
		margin: 4vw;
	}

	.description__header {
		display: grid;
		grid-template-columns: 4fr 1fr;
		grid-template-rows: 1fr;

		padding: 4vw;
	}

	.description__header img {
		vertical-align: middle;
		margin: 1vw;
	}

	.description__content p {
		padding-bottom: 4vw;
	}

	.description__subaction {
		margin-left: auto;
	}

	.closed {
		display: none;
	}
</style>