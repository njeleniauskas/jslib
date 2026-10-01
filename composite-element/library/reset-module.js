import resetFocusState from './reset-focus-state.js';

function resetModule(module) {
	resetFocusState(module);

	module.state.clickEscapesContext = false;
	module.state.isInitial = true;

	for (const key in module.state.nodes) {
		module.state.nodes[key] = null;
	}
}

export default resetModule;
