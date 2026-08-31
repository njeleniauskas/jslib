import validateConfig from './library/validate-config.js';
import setConfig from './library/set-config.js';

/**
 * @param {object} params
 * @param {string} params.id - the id that links the control and target together
 * @param {string} [params.attributes.control] - the data- attribute identifying the control node
 * @param {string} [params.attributes.target] - the data- attribute identifying the target node
 * @param {string} [params.attributes.pressed] - the data- attribute for the button state
 * @param {string} [params.attributes.disclose] - the data- attribute for toggling show/hide
 */
class DisclosureElement {
	constructor(params) {
		this.props = {
			id: null,
			attributes: {
				control: null,
				target: null,
				pressed: null,
				visibility: null
			}
		};
		this.nodes = {};


		this.init(params);
	}

	init(params) {
		validateConfig(params);
		setConfig(this, params);
		getNodes(this);
		addEvents(this);
	}
}
