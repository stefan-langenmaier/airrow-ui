<script>
	import Menu from './Menu.svelte';
</script>

<div class="screen">
	<div class="step">
		<div class="header"></div>
		<div class="description">
			<h1 class="description_heading">Über Donumenta</h1>

			<div class="description__list">
				<div class="description__innerlist">
					<div class="description__element">
						<p>Die donumenta steht für aktuelle Kunst aus 14 Ländern an der Donau: Multimedia, Performance, Installation, Fotografie, Malerei, Crossover – grenzenlos. Sie ist die Initiative ihrer künstlerischen Leiterin Regina-Hellwig-Schmid und wurde als Verein 2002 in Regensburg gegründet.
							Der donumenta e.V. macht Regensburg zur Drehscheibe des internationalen Kulturaustauschs entlang der Donau und trägt zum Profil der Welterbe-Stadt als Ort zeitgenössischer Kunst bei.	
						</p>
					</div>
					<div class="description__element">
						<p>Die donumenta steht für aktuelle Kunst aus 14 Ländern an der Donau: Multimedia, Performance, Installation, Fotografie, Malerei, Crossover – grenzenlos. Sie ist die Initiative ihrer künstlerischen Leiterin Regina-Hellwig-Schmid und wurde als Verein 2002 in Regensburg gegründet.
							Der donumenta e.V. macht Regensburg zur Drehscheibe des internationalen Kulturaustauschs entlang der Donau und trägt zum Profil der Welterbe-Stadt als Ort zeitgenössischer Kunst bei.	
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="menu">
		<Menu />
	</div>
</div>

<style>
	.step {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 2fr 5fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: -1;
	}

	.header {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;

		background-image: url('/assets/images/header-donumenta.png');
		background-size: cover;
		background-position: center;
		background-color: white;
		
	}

	.description {
		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 2;
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
		max-height: calc(var(--vh, 1vh) * 45);
		margin: 1em;
		overflow: scroll;
	}

	.description__element {
		max-width: 80vw;
		color: var(--font-color);
		margin-bottom: 2em;
	}
</style>