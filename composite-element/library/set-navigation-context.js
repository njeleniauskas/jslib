/**
 * @param {object} params
 * @param {class} module - the class module
 */

function setNavigationContext(module, params) {
	module.state.nodes.lastContext = module.state.nodes.context;
	module.state.nodes.context = params.nodes.context;
	module.state.nodes.parent = params.nodes.parent;
	module.state.nodes.children = params.nodes.children;
	module.state.nodes.focusedChild = null;
	module.state.nodes.lastFocusedChild = null;

	module.state.language = params.language;
	module.state.orientation = params.orientation;
	module.state.navigationKeys = params.navigationKeys;
}

export default setNavigationContext;
