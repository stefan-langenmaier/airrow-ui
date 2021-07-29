<script>
	import { accepted, booted, api } from './state.js';
	import { fade } from 'svelte/transition';
	import * as Util from './util.js'

	export let airrow;

	let finishedAnimation = false;
	let bootReady = false;

	boot();

	setTimeout(() => {
		finishedAnimation = true;
		continueIfReady();
    }, 2000);

	function continueIfReady() {
		if (finishedAnimation && bootReady) {
			$booted = true;
		}
	}

	function boot() {
		Util.setDocHeight();
		Util.registerDocHeightListeners();
		airrow.apiServer = Util.getApiServer();

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
	<div class="logo" class:finished={finishedAnimation} transition:fade="{{duration: 1000}}">
		<svg viewBox="0 0 100 100" version="1.1"
			xmlns="http://www.w3.org/2000/svg">
			<circle class="black ring level-6" cx="50" cy="50" r="50"/>
			<circle class="red ring level-5" cx="50" cy="50" r="45"/>
			<circle class="white ring level-4" cx="50" cy="50" r="35"/>
			<circle class="red ring level-3" cx="50" cy="50" r="25"/>
			<circle class="white ring level-2" cx="50" cy="50" r="15"/>
			<circle class="red ring level-1" cx="50" cy="50" r="5"/>
			<polyline class="arrow" points="10,80 50,50 28,95" />
			<rect class="trema left" x="40" y="46" width="5" height="7"/>
			<rect class="trema right" x="55" y="46" width="5" height="7"/>
		</svg>
	</div>
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

	.logo svg {
		max-height: 80vh;
		margin: auto;
	}
	.finished .red {
		fill: rgba(255, 0, 0, 1);
	}

	.red {
		fill: rgba(255, 0, 0, 0);
	}

	.finished .white {
		fill: rgba(255, 255, 255, 1);
	}

	.white {
		fill: rgba(255, 255, 255, 0);
	}

	.finished .black {
		fill: rgba(0, 0, 0, 1);
	}

	.black {
		fill: rgba(0, 0, 0, 0);
	}

	.finished .arrow {
		stroke: rgba(0, 128, 128, 1);
		animation: none;
	}

	.arrow {
		stroke: rgba(0, 128, 128, 0);
		stroke-width: 7;
		fill: none;
		animation: enter-arrow 2s ease;
		animation-fill-mode: forwards;
	}

	.finished .trema {
		fill: rgba(0, 128, 128, 1);
		animation: none;
		transform-origin: center center;
		transform: rotate(45deg);
	}

	.trema {
		fill: rgba(0, 128, 128, 0);
		animation: draw-trema 2s ease;
		animation-fill-mode: forwards;

		transform-origin: center center;
	}

	@keyframes enter-arrow {
		0% {
			transform: translate(-3%, 3%);
			stroke: rgba(0, 128, 128, 0);
		}
		100% {
			transform: translate(0, 0);
			stroke: rgba(0, 128, 128,1);
		}
	}

	.finished .ring {
		animation: none;
	}

	.ring {
		animation-duration: 0.1s;
		animation-fill-mode: forwards;
		transform-origin: center center;
	}

	.ring.red {
		animation-name: draw-red-target;
	}

	.ring.white {
		animation-name: draw-white-target;
	}

	.ring.black {
		animation-name: draw-black-target;
	}

	.ring.level-1 {
		animation-delay: 1s;
	}
	.ring.level-2 {
		animation-delay: 1.1s;
	}
	.ring.level-3 {
		animation-delay: 1.2s;
	}
	.ring.level-4 {
		animation-delay: 1.3s;
	}
	.ring.level-5 {
		animation-delay: 1.4s;
	}
	.ring.level-6 {
		animation-delay: 1.5s;
	}

	@keyframes draw-red-target {
		0% {
			fill: rgba(255, 0, 0, 0);
			transform: scale(1);
		}

		50% {
			transform: scale(1.2);
		}

		100% {
			fill: rgba(255, 0, 0, 1);
			transform: scale(1);
		}
	}

	@keyframes draw-white-target {
		0% {
			fill: rgba(255, 255, 255, 0);
		}

		100% {
			fill: rgba(255, 255, 255, 1);
		}
	}

	@keyframes draw-black-target {
		0% {
			fill: rgba(0, 0, 0, 0);
		}

		100% {
			fill: rgba(0, 0, 0, 1);
		}
	}

	@keyframes draw-trema {
		0% {
			transform: rotate(0deg);
			fill: rgba(0, 128, 128, 0);
		}
		100% {
			transform: rotate(45deg);
			fill: rgba(0, 128, 128,1);
		}
	}
</style>