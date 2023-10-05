<script>
	import { _ } from 'svelte-i18n';

	import { accepted } from './state.js';
	import * as Util from './util.js'

	let step = "welcome";

	function next(nextStep) {
		step = nextStep;
	}

	function handleLegal() {
		Util.setLegalVerified(true);
		$accepted = true;
	}
</script>

<div class="screen">
	{#if step === "welcome"}
	<div class="step">
		<div class="header"></div>
		<div class="description">
			<h1>{$_('legal.welcome.title')}</h1>

			<p>{$_('legal.welcome.p1')}</p>
			<p>{$_('legal.welcome.p2')}</p>
			<p>{$_('legal.welcome.p3')}</p>
			<p>{$_('legal.welcome.p4')}</p>
		</div>
		<div class="nav">
			<button on:click="{() => next('sponsors')}">{$_('legal.next')}</button>
		</div>
	</div>
	{:else if step === "sponsors"}
	<div class="step">
		<div class="header"></div>
		<div class="description">
			<h1>{$_('legal.sponsors.with-support-from')}</h1>

			<div class="sponsors__element">
				<a href="https://www.regensburg.de/" target="_blank">
					<span class="sponsors__image">
						<img src="/assets/images/sponsors/stadt-regensburg.jpg" alt="Logo der Stadt Regensburg">
					</span>
					<span class="sponsors__name">Stadt Regensburg</span>
				</a>
			</div>
			<div class="sponsors__element">
				<a href="https://www.stmwi.bayern.de/" target="_blank">
					<span class="sponsors__image">
						<img src="/assets/images/sponsors/BayStaats.jpg" alt="Bayerisches Staatsministerium für Wirtschaft, Landesentwicklung und Energie">
					</span>
					<span class="sponsors__name">Bayerisches Staatsministerium für Wirtschaft, Landesentwicklung und Energie</span>
				</a>
			</div>
			<div class="sponsors__element">
				<a href="https://www.kulturstaatsministerin.de/" target="_blank">
					<span class="sponsors__image">
						<img src="/assets/images/sponsors/bundesregierung-kultur-und-medien.svg" alt="Logo für Bundesregierung-Kultur und Medien">
					</span>
					<span class="sponsors__name">Gefördert von der Beauftragten der Bundesregierung für Kultur und Medien</span>
				</a>
			</div>
			<div class="sponsors__element">
				<a href="https://www.soziokultur.de/" target="_blank">
					<span class="sponsors__image">
						<img src="/assets/images/sponsors/bundesverband-soziokultur.svg" alt="Logo des Bundesverband Soziokultur">
					</span>
					<span class="sponsors__name">Bundesverband Soziokultur</span>
				</a>
			</div>
			<div class="sponsors__element">
				<a href="https://www.soziokultur.neustartkultur.de/" target="_blank">
					<span class="sponsors__image">
						<img src="/assets/images/sponsors/neustart-kultur.svg" alt="Logo Soziokultur Neustart">
					</span>
					<span class="sponsors__name">Bundesverband Soziokultur</span>
				</a>
			</div>
			<div class="sponsors__element">
				<a href="https://www.kulturstaatsministerin.de/" target="_blank">
					<span class="sponsors__image">
						<img src="/assets/images/sponsors/bvs-neustart.svg" alt="Logo Soziokultur Neustart">
					</span>
					<span class="sponsors__name">Gefördert von der Beauftragten der Bundesregierung für Kultur und Medien</span>
				</a>
			</div>
		</div>
		<div class="nav">
			<button on:click="{() => next('legal')}">{$_('legal.next')}</button>
		</div>
	</div>
	{:else}
	<div class="step">
		<div class="header"></div>
		<div class="description">
			<h1>{$_('legal.privacy.title')}</h1>

			<p>
				<a href="{$_('legal.privacy.link')}" target="_blank">{$_('legal.privacy.imprint-and-privacy')}</a>	
			</p>
		</div>
		<div class="nav">
			<button on:click="{handleLegal}">{$_('legal.privacy.accept')}</button>
		</div>
	</div>
	{/if}
</div>

<style>

	.step {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 3fr 4fr 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: -1;
	}

	.description {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 2;
		grid-row-end: -1;

		max-height: calc(var(--vh, 1vh) * 50);
		overflow: scroll;
	}

	.description p {
		margin: 1em;
	}

	.description h1 {
		margin: 1em;
	}

	.header {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;

		background-image: url('/assets/images/logo.png');
		background-size: cover;
		background-position: center;
		background-color: white;
		
	}

	.nav {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 3;
		grid-row-end: -1;
		
		margin: auto;
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