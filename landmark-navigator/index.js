/**
 * @param {object} params
 * @param {string} atttribute - The data attribute to identify landmark regions.
 */

class LandmarkNavigator {
	constructor(params) {
		this.nodes = null;
		this.key = null;
		this.attribute = null;
		this.lastIndex = null;
		this.wasF6 = false;
		this.state = {};

		this.#init(params);
	}

	#init(params) {
		const args = params ?? {};

		this.key = 'key' in args ? args.key : 'F6';
		this.attribute = 'attribute' in args ? args.attribute : '[data-landmark]';
		this.nodes = [...document.querySelectorAll(this.attribute)];
		this.lastIndex = this.nodes.length - 1;

		this.#addEvents();
	}

	#addEvents() {
		window.addEventListener('keydown', (event) => {
			if (event.key !== this.key) return;
			this.wasF6 = true;

			this.handleKeydownEvent(event);
		});

		this.nodes.forEach((node) => {
			node.addEventListener('blur', (event) => {
				node.removeAttribute('tabindex');
			});
		});
	}

	handleKeydownEvent(event) {
		this.state = this.getState();

		if (!this.state.nodeIsLandmark) {
			event.preventDefault();

			const landmark = this.state.node.closest(this.attribute);

			if (landmark) {
				landmark.setAttribute('tabindex', '-1');
				landmark.focus();
			} else {
				this.nodes[0].setAttribute('tabindex', '-1');
				this.nodes[0].focus();
			}

			return;
		}

		if (this.state.nodeIsLandmark) {
			const currentIndex = this.nodes.indexOf(this.state.node);
			const isFirstAndBack = currentIndex === 0 && event.shiftKey;
			const isLastAndForward = currentIndex === this.lastIndex && !event.shiftKey;

			if (!isFirstAndBack && !isLastAndForward) {
				event.preventDefault();
				const step = event.shiftKey ? -1 : 1;
				const target = this.nodes[currentIndex + step];

				target.setAttribute('tabindex', '-1');
				target.focus();
				return;
			}
		}

		this.state = {};
	}

	getState() {
		const node = document.activeElement ?? document.body;

		return {
			node: node,
			nodeIsLandmark: this.nodes.includes(node)
		}
	}
}

export default LandmarkNavigator;
