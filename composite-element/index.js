import createProps from './properties/props.js';
import createNodes from './properties/nodes.js';
import createState from './properties/state.js';

import getNavigationConfig from '../common/composite-navigation/get-navigation-config.js';
import validateNavigationConfig from '../common/composite-navigation/validate-navigation.config.js';
import getPersistentNodes from '../common/composite-navigation/get-persistent-nodes.js';
import getNavigationContext from '../common/composite-navigation/get-navigation-context.js';
import setPersistentNodes from './library/set-persistent-nodes.js';
import setConfiguration from './library/set-configuration.js';
import setNavigationContext from './library/set-navigation-context.js';
import addEvents from './library/add-events.js';
import getCustomFunctions from './utilities/get-custom-functions.js';
import updateContextState from './library/update-context-state.js';

/**
 * @param {Object} params
 * @param {string} params.id - The id that defines the context of attributes.
 * @param {string} params.name - The name used to identify the class.
 *
 * @param {string} [params.attributes]
 * @param {string} [params.attributes.contextNode] - The attribute for the navigation context node(s).
 * @param {string} [params.attributes.componentNode] - The attribute for the node that represents the component.
 * @param {string} [params.attributes.parentNode] - The attribute for the parent node (for dynamic generation).
 * @param {string} [params.attributes.childNode] - The attribute for child nodes.
 *
 * @param {string} [params.attributes.orientation] - Optional property to assign aria- string.
 * @param {string} [params.attributes.activeDescendant] - Optional property to assign aria- string.
 *
 * @param {string} [params.attributes.contextState] - Used to identify which context should be used for navigation.
 * @param {string} [params.attributes.componentFocus] - The attribute used for the component's focus state.
 * @param {string} [params.attributes.childFocus] - The attribute used for a child's focus state.
 */

class CompositeElement {
	constructor(params) {
		this.sublcass = new.target !== CompositeElement;
		this.id = null;
		this.name = null;
		this.attributePrefix = null;
		this.props = createProps();
		this.nodes = createNodes();
		this.state = createState();
		this.functions = {};
		this.emitter = null;

		const attributePrefix = 'attributePrefix' in params ?
			params.attributePrefix : 'data-ce';

		this.#init({...params, attributePrefix });
	}

	#init(params) {
		try {
			this.#setup(params);
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

	#setup(params) {
		this.#processConfig(params);
		this.#processNodes();
		addEvents(this);
	}

	#processConfig(params) {
		const config = getNavigationConfig(params);

		validateNavigationConfig(config);
		setConfiguration(this, config);

		this.emitter = 'emitter' in params ? params.emitter : null;
		this.functions = this.sublcass ? {} : getCustomFunctions(this, params);
	}

	#processNodes() {
		const nodes = getPersistentNodes({
			id: this.id,
			nodes: {
				contexts: {
					array: true,
					attribute: this.props.attributes.context
				},
				component: {
					array: false,
					attribute: this.props.attributes.component
				}
			}
		});

		setPersistentNodes(this, nodes);
	}

	processNavigationContext(type, params) {
		const context = getNavigationContext(this, type, params);

		setNavigationContext(this, context);
		updateContextState(this.state.nodes, this.props.attributes.contextState);
	}
}

export default CompositeElement;
