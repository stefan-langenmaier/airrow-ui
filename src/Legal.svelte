<script>
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
			<h1>donumenta art goes VR/AR</h1>

			<p>
				Herzlich Wilkommen in der augmented reality app dagva.donumenta.de 
				2017 initiierte und etablierte der donumenta e.V. das internationale Artist in Residence-Programm (AiR) "HERITAGE TODAY/TOMORROW" für temporäre Interventionen im öffentlichen Raum in Regensburg. Seither kommen jährlich 4-5 internationale Kuenstler*innen und entwickeln Konzepte und Projekte, die im öffentlichen Raum in Regensburg realisiert werden. 
				In dieser App haben Sie die Möglichkeit das Engagement des donumenta e.V. ortsunabhängig im Internet abzurufen.
				Nach Freigabe ihres Standortes werden sia via GPS zu den Kunstwerken geführt.  
				Wenn Sie den Zielort erreicht haben, können Sie mit Hilfe der App Anwendung die temporären bereits rückgebauten Kunstwerke virtuell wieder zum Leben zu erwecken.
				Im Menü werden je nach Standort eine oder mehrere verschiedene 3D Installationen in AR-Ebenen angezeigt.
			</p>
		</div>
		<div class="nav">
			<button on:click="{() => next('legal')}">Weiter</button>
		</div>
	</div>
	{:else}
	<div class="step">
		<div class="header"></div>
		<div class="description">
			<h1>Unsere AGB und Datenschutzerklärung</h1>

			<p>
				<a href="https://www.donumenta.de/info/impressum-und-datenschutz/" target="_blank">Impressum und Datenschutz</a>	
			</p>
		</div>
		<div class="nav">
			<button on:click="{handleLegal}">Ich stimme zu</button>
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
		grid-row-end: 3;

		max-height: calc(var(--vh, 1vh) * 40);
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
</style>