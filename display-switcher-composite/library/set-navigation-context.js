import state from '../data/state.js';

/**
 * @param {object} params 
 */

function setNavigationContext(params) {
	state.navigation.context = params.context;
	state.navigation.parent = params.parent;
	state.navigation.children = params.children;
}

export default setNavigationContext;