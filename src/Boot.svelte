<script>
	import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';
	import { fade } from 'svelte/transition';

	import { accepted, booted } from './state.js';
	import * as Util from './util.js'
	import en from './i18n/en.json';
	import de from './i18n/de.json';

	export let airrow;

	let finishedAnimation = false;
	let startAnimation = false;
	let bootReady = false;

	boot();

	setTimeout(() => {
		finishedAnimation = true;
		continueIfReady();
    }, 2000);

	setTimeout(() => {
		startAnimation = true;
    }, 0);

	function continueIfReady() {
		if (finishedAnimation && bootReady) {
			$booted = true;
		}
	}

	function boot() {
		Util.setDocHeight();
		Util.registerDocHeightListeners();
		airrow.apiServer = Util.getApiServer();

		addMessages('en', en);
		addMessages('de', de);

		init({
			fallbackLocale: 'de',
			initialLocale: getLocaleFromNavigator(),
		});

		airrow.sessionId = Util.getSessionId();

		$accepted = Util.isLegalVerified();

		const hash = window.location.hash;
		if (hash !== "") {
			airrow.status = decodeURI(hash.substring(1));
		}

		bootReady = true;
		continueIfReady();
	}

</script>

<div class="screen">
	{#if startAnimation}
	<div class="logo" in:fade="{{duration: 1000}}">
		<img src="/assets/images/logo.png" alt="donumenta" />
		<h1>dagva – donumenta goes VR/AR</h1>
	</div>
	{/if}
</div>

<style>

	.logo {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		grid-column-start: 1;
		grid-column-end: -1;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.logo img {
		margin: auto;
		max-width: 100vw;
		max-height: 60vh;
	}

	.logo h1 {
		text-align:center;
	}

</style>