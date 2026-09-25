import validateConfig from './library/validate-config.js';
import setConfig from './library/set-config.js';
import getNodes from './library/get-nodes.js';
import addEvents from './library/add-events.js';
import getTheme from './library/get-theme.js';
import setTheme from './library/set-theme.js';

/**
 * @param {object} params
 * @param {object} params.strings - The identifier strings for the control/animation nodes.
 * @param {object} params.strings.root - The data attribute that holds the theme name on the html element.
 * @param {object} params.strings.control - The data attribute for controls.
 * @param {object} [params.strings.controlState] - The data attribute for the node communicating the accessible state of the control.
 * @param {object} [params.strings.multiState] - A data attribute that flags a control as having more than one value.
 * @param {array} params.themes - The names for each theme that are available (in CSS).
 * @param {number} [params.delay] - The delay timing for the execution of the theme change.
 */

class ThemeControl {
	constructor(params) {
		this.props = {
			strings: {
				root: null,
				control: null,
				controlState: null,
				multiState: null,
			},
			themes: [],
			delay: 0
		}
		this.controls = null;
		this.nodes = null;

		this.#init(params);
	}

	#init(params) {
		try {
			validateConfig(params);
			setConfig(this, params);
			getNodes(this, this.props.strings);
			addEvents(this);
			setTheme(this, getTheme());

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

export default ThemeControl;
