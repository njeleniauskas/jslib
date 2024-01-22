import updateSingleSelection from '../../common/group-selection/update-single-selection.js';

import props from '../data/props.js';
import state from '../data/state.js';
import updateViewState from './update-view-state.js';

function handleClickEvent(event) {
	const targetChild = event.target.closest(`[${props.attributes.child}="${props.id}"]`);
	let isSelected = false;
	let targetView = undefined;

	if (targetChild !== null) {
		isSelected = (targetChild.getAttribute(props.attributes.selected) === 'true');
	}

	if (targetChild !== null && !isSelected) {
		targetView = targetChild.getAttribute(props.attributes.controlID);

		updateSingleSelection(state.navigation.children, {
			'targetNode': targetChild,
			'selectionAttribute': props.attributes.selected,
			'selectionByValue': true,
		});

		updateViewState(targetView);
	}
}

export default handleClickEvent;