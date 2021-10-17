<script>
	import { _ } from 'svelte-i18n';

	import Menu from './Menu.svelte';
</script>

<div class="screen">
	<div class="description">
		<h1 class="description_heading">{$_('corona.title')}</h1>

		<div class="description__list">
			<div class="description__innerlist">
				<div class="description__element">
					<p>{$_('corona.description.warning')}</p>
				</div>
				<div class="description__element">
					<p>{$_('corona.description.vaccination')}</p>
				</div>
				<div class="description__element">
					<p>{$_('corona.description.protection')}</p>
					<ul>
						<li>{$_('corona.description.p1')}</li>
						<li>{$_('corona.description.p2')}</li>
						<li>{$_('corona.description.p3')}</li>
						<li>{$_('corona.description.p4')}</li>
						<li>{$_('corona.description.p5')}</li>
					</ul>
				</div>
				<div class="description__element">
					<p>{$_('corona.description.join')}</p>
				</div>
			</div>
		</div>
	</div>
	<div class="menu">
		<Menu />
	</div>
</div>

<style>
	.description {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: -1;

		display: flex;
		flex-direction: column;
	}

	.description_heading {
		margin-left: 1em;
		margin-right: 1em;
	}

	.description__list {
		flex-grow: 1;
		border-top-left-radius: 1em;
		border-top-right-radius: 1em;
		background-color: white;
		margin-left: 1em;
		margin-right: 1em;
	}

	.description__innerlist {
		max-height: calc(var(--vh, 1vh) * 75);
		margin: 1em;
		overflow: scroll;
	}

	.description__element {
		max-width: 80vw;
		color: var(--font-color);
		margin-bottom: 2em;
	}
</style>