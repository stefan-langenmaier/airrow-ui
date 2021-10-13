<script>
	import Menu from './Menu.svelte';
</script>

<div class="screen">
	<div class="sponsors">
		<h1 class="sponsors_heading">Unsere Sponsoren</h1>

		<div class="sponsors__list">
			<div class="sponsors__innerlist">
				<div class="sponsors__element">
					<span class="sponsors__image">
						<img src="/assets/images/sponsors/stadt-regensburg.jpg" alt="">
					</span>
					<span class="sponsors__name">Stadt Regensburg</span>
				</div>
				<div class="sponsors__element">
					<span class="sponsors__image">
						<img src="/assets/images/sponsors/bvs.png" alt="">
					</span>
					<span class="sponsors__name">BVS</span>
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

		border-style: solid;
		border-radius: 1em;

		margin: auto;
		display: block;
	}

	.sponsors__element {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
		overflow: hidden;
		white-space: nowrap;
		color: var(--font-color);
		margin-bottom: 2em;
	}
</style>
