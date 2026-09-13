import resetFocusState from './reset-focus-state.js';

function resetModule(module) {
	resetFocusState(module);

	module.state.clickEscapesContext = false;
	module.state.nodes.lastFocusedChild = null;
	module.state.nodes.focusedChild = null;
	module.state.isInitial = true;
}

export default resetModule;
