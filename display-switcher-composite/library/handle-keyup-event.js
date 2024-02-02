import itemInArray from '../../common/utilities/item-in-array.js';
import updateSingleSelection from '../../common/group-selection/update-single-selection.js';

import props from '../data/props.js';
import state from '../data/state.js';
import updateViewState from './update-view-state.js';

/**
 * @param {event} event - The keyup event.
 */

function handleKeyupEvent(event) {
	if (itemInArray(props.keys.selection, event.key)) {
		let isSelected = false;
		let targetView = undefined;

		isSelected = (state.navigation.focusedChild.getAttribute(props.attributes.selected) === 'true');

		if (!isSelected) {
			targetView = state.navigation.focusedChild.getAttribute(props.attributes.controlID);

			updateSingleSelection(state.navigation.children, {
				'targetNode': state.navigation.focusedChild,
				'selectionAttribute': props.attributes.selected,
				'selectionByValue': true,
			});

			updateViewState(targetView);
		}
	}
}

export default handleKeyupEvent;