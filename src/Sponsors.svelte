<script>
	import { _ } from 'svelte-i18n';

	import Menu from './Menu.svelte';
</script>

<div class="screen">
	<div class="sponsors">
		<h1 class="sponsors_heading">{$_('sponsors.title')}</h1>

		<div class="sponsors__list">
			<div class="sponsors__innerlist">
				<div class="sponsors__element">
					<a href="https://www.kulturstaatsministerin.de/" target="_blank" rel="noreferrer">
						<span class="sponsors__image">
							<img src="/assets/images/sponsors/bundesregierung-kultur-und-medien.svg" alt="Logo für Bundesregierung-Kultur und Medien">
						</span>
						<span class="sponsors__name">Gefördert von der Beauftragten der Bundesregierung für Kultur und Medien</span>
					</a>
				</div>
				<div class="sponsors__element">
					<a href="https://www.soziokultur.de/" target="_blank" rel="noreferrer">
						<span class="sponsors__image">
							<img src="/assets/images/sponsors/bundesverband-soziokultur.svg" alt="Logo des Bundesverband Soziokultur">
						</span>
						<span class="sponsors__name">Bundesverband Soziokultur</span>
					</a>
				</div>
				<div class="sponsors__element">
					<a href="https://www.soziokultur.neustartkultur.de/" target="_blank" rel="noreferrer">
						<span class="sponsors__image">
							<img src="/assets/images/sponsors/neustart-kultur.svg" alt="Logo Soziokultur Neustart">
						</span>
						<span class="sponsors__name">Bundesverband Soziokultur</span>
					</a>
				</div>
				<div class="sponsors__element">
					<a href="https://www.kulturstaatsministerin.de/" target="_blank" rel="noreferrer">
						<span class="sponsors__image">
							<img src="/assets/images/sponsors/bvs-neustart.svg" alt="Logo Soziokultur Neustart">
						</span>
						<span class="sponsors__name">Gefördert von der Beauftragten der Bundesregierung für Kultur und Medien</span>
					</a>
				</div>
				<div class="sponsors__element">
					<a href="https://www.regensburg.de/" target="_blank" rel="noreferrer">
						<span class="sponsors__image">
							<img src="/assets/images/sponsors/stadt-regensburg.jpg" alt="Logo der Stadt Regensburg">
						</span>
						<span class="sponsors__name">Stadt Regensburg</span>
					</a>
				</div>
				<div class="sponsors__element">
					<a href="https://www.oth-regensburg.de/" target="_blank" rel="noreferrer">
						<span class="sponsors__image">
							<img src="/assets/images/sponsors/oth-regensburg.jpg" alt="Logo der OTH Regensburg">
						</span>
						<span class="sponsors__name">OTH Regensburg</span>
					</a>
				</div>
				<div class="sponsors__element">
					<a href="https://www.uni-regensburg.de/" target="_blank" rel="noreferrer">
						<span class="sponsors__image">
							<img src="/assets/images/sponsors/uni-regensburg.png" alt="Logo der Universität Regensburg">
						</span>
						<span class="sponsors__name">Universität Regensburg</span>
					</a>
				</div>
				<div class="sponsors__element">
					<a href="https://www.regensburg.de/welterbe" target="_blank" rel="noreferrer">
						<span class="sponsors__image">
							<img src="/assets/images/sponsors/welterbe-regensburg.png" alt="Logo Welterbe Regensburg">
						</span>
						<span class="sponsors__name">Welterbe Regensburg</span>
					</a>
				</div>
				<div class="sponsors__element">
					<a href="https://www.regensburg-tourismus.gmbh/" target="_blank" rel="noreferrer">
						<span class="sponsors__image">
							<img src="/assets/images/sponsors/regensburg-tourismus-gmbh.jpg" alt="Logo der Regensburg Tourismus GmbH">
						</span>
						<span class="sponsors__name">Regensburg Tourismus GmbH</span>
					</a>
				</div>
			</div>
		</div>
	</div>
	<div class="menu">
		<Menu />
	</div>
</div>

<style>
	.sponsors {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: -1;

		display: flex;
		flex-direction: column;
	}

	.sponsors_heading {
		margin-left: 1em;
		margin-right: 1em;
	}

	.sponsors__list {
		flex-grow: 1;
		border-top-left-radius: 1em;
		border-top-right-radius: 1em;
		background-color: white;
		margin-left: 1em;
		margin-right: 1em;
	}

	.sponsors__innerlist {
		max-height: calc(var(--vh, 1vh) * 70);
		margin: 1em;
		overflow: scroll;
	}

	.sponsors__image img {
		max-width: 80%;
		height: 30vh;

		border-style: solid;
		border-radius: 1em;

		margin: auto;
		display: block;
	}

	.sponsors__element a {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
		overflow: hidden;
		color: var(--font-color);
		margin-bottom: 2em;
		text-align: center;
	}
</style>
