<script>
	import { _ } from 'svelte-i18n';

	import Menu from './Menu.svelte';
</script>

<div class="screen">
	<div class="description">
		<h1 class="description_heading">{$_('imprint.title')}</h1>

		<div class="description__list">
			<div class="description__innerlist">
				<div class="description__element">
 
					<h2>dagva.donumenta.de – donumenta art goes VR/AR  ist ein Projekt des donumenta e.V.</h2>

					<p>
						1. Vorsitzende Regina Hellwig-Schmid<br />
						Projektbüro donumenta e.V.<br />
						Am Wiedfang 5<br />
						D-93047 Regensburg<br />
						T: +49-941-55133<br />
						F: +49-941-5998320<br />
						E-Mail: <a href="mailto:info@donumenta.de">info@donumenta.de</a> 
					</p>

					<p>
						Kontakt zum Webmaster: <a href="mailto:info@donumenta.de">info@donumenta.de</a>
					</p>

					<h2>Grafik und Konzeption</h2>
					<p>
						Coeno GmbH, Anatol Schmid, Stefan Langenmaier
					</p>

					<h2>Webredaktion, Social Media, Newsletter</h2>
					<p>
						Patrizia Schmid-Fellerer, Julia Weigl-Wagner M.A.
					</p>

					<h3>Programmierung</h3>
					<p>
						Stefan Langenmaier
					</p>

					<h2>Impressum (Angaben gemäß § 5 TMG)</h2>
					<p>
						donumenta e.V.<br />
						Am Wiedfang 5<br />
						93047 Regensburg<br />
						Vereinsregister: VR 1838<br />
						Registergericht: Amtsgericht Regensburg<br />
						<br />
						Vertreten durch:<br />
						1. Vorsitzende Regina Hellwig-Schmid<br />
					</p>

					<h3>Kontakt</h3>
					<p>
						Telefon: +49-941-55133<br />
						Telefax: +49-941-5998320<br />
						E-Mail: <a href="mailto:info@donumenta.de">info@donumenta.de</a> 
					</p>

					<h3>Umsatzsteuer-ID</h3>
					<p>
						Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
						DE249436933
					</p>

					<h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
					<p>
						Regina Hellwig-Schmid<br />
						Am Wiedfang 5<br />
						93047 Regensburg<br />
					</p>

					<h3>Streitschlichtung</h3>
					<p>
						Regina Hellwig-Schmid<br />
						Am Wiedfang 5<br />
						93047 Regensburg<br />
					</p>
					<p>
						Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:https://ec.europa.eu/consumers/odr.
						Unsere E-Mail-Adresse finden Sie oben im Impressum.
						Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
					</p>

					<h4>Haftung für Inhalte</h4>
					<p>
						Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf dieser Seite nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
						Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
					</p>

					<h4>Haftung für Links</h4>
					<p>
						Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
						Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
					</p>

					<h4>Urheberrecht</h4>
					<p>
						Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
						Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
					</p>
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