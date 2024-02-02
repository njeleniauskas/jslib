import props from '../data/props.js';
import state from '../data/state.js';

import getTargetElementIndexByFocus from '../../common/composite-navigation/get-target-element-index-by-focus.js';
import updateFocusState from './update-focus-state.js';

/**
 * @param {event} event - The pointerdown event.
 */

function handlePointerdownEvent(event) {
	let targetChild;
	let targetChildIndex;
	let isChildClick;

	//prepare data
	if (props.navigationType === 'tabindex') {
		targetChild = event.target.closest(`[${props.attributes.child}]`);
		targetChildIndex = state.navigation.children.indexOf(targetChild);
		isChildClick = (targetChild !== null);
	}

	if (props.navigationType === 'activedescendant') {
		targetChild = event.target.closest(`[${props.attributes.child}]`);
		isChildClick = (targetChild !== null);

		if (isChildClick) {
			targetChildIndex = state.navigation.children.indexOf(targetChild);
		} else {
			targetChildIndex = getTargetElementIndexByFocus({
				'selection': props.selection,
				'array': state.navigation.children,
				'selectedAttribute': props.attributes.selected,
				'childAttribute': props.attributes.child,
			});
		}

		targetChild = state.navigation.children[targetChildIndex];
	}

	//update component
	if (props.navigationType === 'tabindex' && isChildClick ||
		props.navigationType === 'activedescendant' && isChildClick ||
		props.navigationType === 'activedescendant' && state.isInitial) {
		updateFocusState(targetChildIndex);
	
		if (state.isInitial) {
			state.navigation.lastFocusedChild = targetChild;
		} else {
			state.navigation.lastFocusedChild = state.navigation.focusedChild;
		}

		state.navigation.focusedChild = targetChild;
		state.isInitial = false;
	}
}

export default handlePointerdownEvent;