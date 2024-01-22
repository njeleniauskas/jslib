import props from '../data/props.js';
import state from '../data/state.js';

import resetFocusState from './reset-focus-state.js';

function handleGlobalPointerdownEvent(event) {
	const componentQueryString = `[${props.attributes.component}="${props.id}"]`;
	const contextQueryString = `[${props.attributes.context}="${props.id}"]`;
	const isWithinContext = (event.target.closest(contextQueryString) !== null);
	const isWithinComponent = (event.target.closest(componentQueryString) !== null);

	state.isPointerEvent = true;

	if (!isWithinContext && !isWithinComponent) {
		resetFocusState();

		state.clickEscapesContext = false;
		state.navigation.lastFocusedChild = null;
		state.navigation.focusedChild = null;
		state.isInitial = true;
	}
}

export default handleGlobalPointerdownEvent;