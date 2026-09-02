/**
 * @param {object} params
 * @param {class} module - the class module
 */

function setNavigationContext(params, module) {
	module.state.navigation.context = params.context;
	module.state.navigation.parent = params.parent;
	module.state.navigation.children = params.children;
}

export default setNavigationContext;
