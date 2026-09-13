import createProps from './properties/props.js';
import createNodes from './properties/nodes.js';
import createState from './properties/state.js';

import getNavigationConfig from '../common/composite-navigation/get-navigation-config.js';
import validateNavigationConfig from '../common/composite-navigation/validate-navigation.config.js';
import validatePersistentNodes from '../common/composite-navigation/validate-persistent-nodes.js';
import getPersistentNodes from '../common/composite-navigation/get-persistent-nodes.js';
import setPersistentNodes from './library/set-persistent-nodes.js';
import setConfiguration from './library/set-configuration.js';
import processNavigationContext from './library/process-navigation-context.js';
import addEvents from './library/add-events.js';
import setCustomFunctions from './library/set-custom-functions.js';

/**
 * @param {object} params
 */

class CompositeElement {
	constructor(params) {
		this.id = null;
		this.props = createProps();
		this.nodes = createNodes();
		this.state = createState();
		this.functions = {};
		this.emitter = null;

		this.init(params);
	}

	init(params) {
		try {
			this.setup(params);
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

	setup(params) {
		this.processConfig(params);
		this.processNodes();
		this.processContext();
		addEvents(this);
	}

	processConfig(params) {
		const config = getNavigationConfig(params);

		validateNavigationConfig(config);
		setConfiguration(this, config);

		this.emitter = 'emitter' in params ? params.emitter : null;
		this.functions = setCustomFunctions(params);
	}

	processNodes() {
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

		validatePersistentNodes(nodes);
		setPersistentNodes(this, nodes);
	}

	processContext() {
		processNavigationContext(this, 'initial',
			{
				contexts: this.nodes.contexts,
				contextState: this.props.attributes.contextState
			}
		);
	}
}

export default CompositeElement;
