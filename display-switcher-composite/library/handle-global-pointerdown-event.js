import resetFocusState from './reset-focus-state.js';

/**
 * @param {object} event - The global pointerdown event.
 * @param {class} module - The class module.
 */

function handleGlobalPointerdownEvent(event, module) {
	const componentQueryString = `[${module.props.attributes.component}="${module.props.id}"]`;
	const isWithinComponent = (event.target.closest(componentQueryString) !== null);

	module.state.isPointerEvent = true;

	if (!isWithinComponent) {
		resetFocusState(module);

		module.state.clickEscapesContext = false;
		module.state.navigation.lastFocusedChild = null;
		module.state.navigation.focusedChild = null;
		module.state.isInitial = true;
	}
}

export default handleGlobalPointerdownEvent;
