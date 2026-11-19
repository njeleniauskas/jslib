import setConfiguration from './library/set-configuration.js';
import initializeFlow from './library/initialize-flow.js';
import getPrimaryNodes from './library/get-primary-nodes.js';
import addEvents from './library/add-events.js';
import updateStep from './library/update-step.js';

/**
 * @param {object} params
 * @param {string} params.id - The id of the class.
 *
 * @param {string} [params.strings]
 * @param {string} [params.strings.flow] - Identifies the overall flow container.
 * @param {string} [params.strings.step] - The attribute representing the current step's name.
 * @param {string} [params.strings.focusable] - Identifies focusable elements within a step.
 * @param {string} [params.strings.hidden] - The display attribute to show/hide steps.
 *
 * @param {string} [params.container] - The flow-containing element.
 *
 * @param {object} params.steps - Each step in the flow.
 * @param {object} [params.emitter] - The event emitter (if needed).
 */

class Flow {
	constructor(params) {
		this.id = null;
		this.props = {
			strings: {
				flow: null,
				step: null,
				hidden: null,
			}
		};
		this.nodes = {
			flow: null,
			steps: [],
		};
		this.steps = {};
		this.state = {
			canUpdate: true,
			step: null,
			body: {}
		};
		this.emitter = null;

		this.#init(params);
	}

	#init(params) {
		try {
			setConfiguration(this, params);
			getPrimaryNodes(this, params);
			initializeFlow(this);
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

	resetFlow() {
		const key = Object.keys(this.steps)[0];
		const step = this.steps[key];

		updateStep(step, this);
	}
}

export default Flow;
