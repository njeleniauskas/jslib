import debounce from '../common/utilities/debounce.js';

/**
 * @param {object} params
 * @param {string} params.node - The live region query selector string.
 * @param {delay} [params.delay] - An optional delay time to adjust for the user's preferences.
 */
class LiveRegionManager {
	constructor(params) {
		this.node = null;
		this.queue = new Set();
		this.delay = 2;
		this.deliverMessages = debounce(this.updateLiveRegion.bind(this), this.delay);

		this.init(params);
	}

	init(params) {
		this.node = document.querySelector(params.node);
		
		if ('delay' in params) {
			this.delay = params.delay;
		}
	}

	addMessage(message) {
		this.queue.add(message);
		this.deliverMessages();
	}

	updateLiveRegion() {
		if (this.queue.size === 0) return;
		this.node.textContent = Array.from(this.queue).join(' ');
		this.queue.clear();
	}
}

export default LiveRegionManager;