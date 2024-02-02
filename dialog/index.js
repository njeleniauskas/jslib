import setConfiguration from './library/set-configuration.js';
import initializeDialog from './library/initialize-dialog.js';
import addEvents from './library/add-events.js';

/**
 * A class handling a single dialog component.
 * @param {object} strings - Strings used to identify nodes, or represent statedness.
 * @param {string} strings.passer - The attribute for the passing node.
 * @param {string} strings.receiver - The attribute for the receiving node.
 * @param {string} strings.window - The string for the window node.
 * @param {string} strings.control - The string for the control node.
 * @param {string} strings.hidden - The string controlling the availability of the window to the user (for assistive technologies).
 * @param {string} [strings.toggle] - The string controlling the transition state of the window.
 * @param {string} [strings.inert] - The string gating interaction on the control element (if a delay is used).
 * @param {string} [timing] - The delay window for toggling the hidden string to the "hidden" state.
 * 
 * Note: this function should be retired in 2025–6 once Safari catches up.
*/

class Dialog {
	constructor(params) {
		this.props = {
			strings: {
				passer: null,
				receiver: null,
				control: null,
				window: null,
				hidden: null,
				toggle: null,
				inert: null,
			},
			keys: {
				clear: ['Escape']
			},
			timing: 0,
		};
		this.nodes = {};
		this.state = {
			stack: [],
			length: 0,
			opened: false,
			windowInteractive: false,
			gateControl: false,
		};

		this.init(params);
	}

	init(params) {
		setConfiguration(this, params);
		initializeDialog(this);
		addEvents(this);
	}
}

export default Dialog;