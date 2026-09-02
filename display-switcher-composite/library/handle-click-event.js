import updateSingleSelection from '../../common/group-selection/update-single-selection.js';
import updateViewState from './update-view-state.js';

/**
 * @param {event} event - The click event.
 * @param {class} module - The class module.
 */

function handleClickEvent(event, module) {
	const targetChild = event.target.closest(`[${module.props.attributes.child}="${module.props.id}"]`);
	let isSelected = false;
	let targetView = undefined;

	if (targetChild !== null) {
		isSelected = (targetChild.getAttribute(module.props.attributes.selected) === 'true');
	}

	if (targetChild !== null && !isSelected) {
		targetView = targetChild.getAttribute(module.props.attributes.controlID);

		updateSingleSelection(module.state.navigation.children, {
			'targetNode': targetChild,
			'selectionAttribute': module.props.attributes.selected,
			'selectionByValue': true,
		});

		updateViewState(targetView, module);
	}
}

export default handleClickEvent;
