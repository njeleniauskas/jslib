import getNodes from './get-nodes.js';
import initializeObserver from './initialize-observer.js';
import computeScrollState from './compute-scroll-state.js';

/**
 * @param {object} module - The class module.
 * @param {object} params - The passed arguments to the class.
 */

function initializeConfiguration(module, params) {
	try {
		module.props = {...module.props, ...params};
		const {visibility, hidden, ...args} = module.props.strings;

		module.nodes = getNodes(args);
		module.state = computeScrollState(module);

		if ('emitter' in params) {
			module.emitter = params.emitter;
		}
		
		if (module.props.config === 'scroll' && 'clearing' in module.nodes) {
			const observer = initializeObserver(module);
	
			observer.observe(module.nodes.clearing);
		}
	} catch (error) {
		console.error(error);
	}
}

export default initializeConfiguration;