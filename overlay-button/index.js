import validateConfig from './library/validate-config.js';
import initializeConfiguration from './library/initialize-config.js';
import addEvents from './library/add-events.js';

/**
 * 
 * @param {string} params
 * @param {'scroll'} params.config - The type of disclosure.
 * @param {object} params.strings
 * @param {string} params.strings.control - The string identifying the control node.
 * @param {string} [params.strings.clearing] - The string for the clearing node.
 * @param {string} params.strings.visibility - The class to show/hide the button.
 * @param {string} params.strings.hidden - The attribute used to show/hide content to assistive technologies.
 * @param {number} [params.screenfuls] - The number of screenfuls before showing the button.
 * @param {number} [params.timing] - The delay window for hiding the button. 
 */

class OverlayButton {
	constructor(params) {
		this.props = {
			delay: 50,
			timing: 0,
		};
		this.nodes = {};
		this.state = {
			viewportHeight: 0,
			scrolled: 0,
			startPosition: 0,
			blocked: false,
		};

		this.init(params);
	}

	init(params) {
		try {
			validateConfig(params);
			initializeConfiguration(this, params);
			addEvents(this);
		} catch (errors) {
			if (errors instanceof AggregateError) {
				console.error(errors.message)

				for (const error of errors.errors) {
					console.error(error.message);
				}
			} else {
				console.error(errors);
			}
		}
	}
}

export default OverlayButton;