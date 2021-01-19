/**
 * Handles WPGraphQL plugin installation at Settings → Headless.
 */
wpeHeadless.installWPGraphQL = (() => {
	const $button = document.getElementById('wpe-headless-button-install-graphql');
	const $spinner = document.querySelector('.get-started .spinner');
	const $status = document.querySelector('.get-started .error-message');

	// Attaches event listeners.
	function init() {
		$button.onclick = (event) => {
			event.preventDefault();
			installWPGraphQL().then((result) => {
				if (result.status === 'active') {
					update('complete');
				} else {
					update('failed', wpeHeadless.strings.failed);
				}
			}).catch(result => {
				update('failed', result.message || wpeHeadless.strings.failed);
			});
		}
	}

	// Installs and activates the WP GraphQL plugin.
	async function installWPGraphQL() {
		update('installing');

		// Default to install and activate.
		const request = {
			path: '/wp/v2/plugins',
			method: 'POST',
			data: {slug: 'wp-graphql', status: 'active'}
		}

		// Just activate the plugin if it is already installed.
		if (wpeHeadless.wpgraphqlIsInstalled) {
			request.path = '/wp/v2/plugins/wp-graphql/wp-graphql';
			request.data = {status: 'active'};
		}

		return await wp.apiFetch(request);
	}

	// Updates the button and spinner.
	function update(state = 'installing', error = "") {
		switch (state) {
			case 'installing':
				wp.a11y.speak(wpeHeadless.strings.installing, 'polite');
				$button.innerHTML = wpeHeadless.strings.installing;
				$button.disabled = true;
				$spinner.style.visibility = 'visible';
				$status.innerHTML = '';
				break;
			case 'complete':
				wp.a11y.speak(wpeHeadless.strings.active, 'polite');
				$button.innerHTML = `☑️ ${wpeHeadless.strings.active}`;
				$spinner.style.visibility = 'hidden';
				break;
			case 'failed':
				wp.a11y.speak(error || wpeHeadless.strings.failed, 'polite');
				$button.innerHTML = wpeHeadless.strings.default;
				$button.disabled = false;
				$spinner.style.visibility = 'hidden';
				$status.innerHTML = error;
				break;
		}
	}

	return {init: init}
})();

wpeHeadless.installWPGraphQL.init();
