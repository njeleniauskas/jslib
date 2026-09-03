import resetFocusState from './reset-focus-state.js';

/**
 * @param {object} event - The global pointerdown event.
 * @param {class} module - The class module.
 */

function handleGlobalPointerdownEvent(event, module) {
	const contextQueryString = `[${module.props.attributes.context}="${module.props.id}"]`;
	const isWithinContext = (event.target.closest(contextQueryString) !== null);

	module.state.isPointerEvent = true;

	if (!isWithinContext) {
		resetFocusState(module);

		module.state.clickEscapesContext = false;
		module.state.navigation.lastFocusedChild = null;
		module.state.navigation.focusedChild = null;
		module.state.isInitial = true;
	}
}

export default handleGlobalPointerdownEvent;
