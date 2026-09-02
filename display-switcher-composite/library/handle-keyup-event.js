import itemInArray from '../../common/utilities/item-in-array.js';
import updateSingleSelection from '../../common/group-selection/update-single-selection.js';
import updateViewState from './update-view-state.js';

/**
 * @param {event} event - The keyup event.
 * @param {class} module - The class module.
 */

function handleKeyupEvent(event, module) {
	if (itemInArray(module.props.keys.selection, event.key)) {
		let isSelected = false;
		let targetView = undefined;

		isSelected = (module.state.navigation.focusedChild.getAttribute(module.props.attributes.selected) === 'true');

		if (!isSelected) {
			targetView = module.state.navigation.focusedChild.getAttribute(module.props.attributes.controlID);

			updateSingleSelection(module.state.navigation.children, {
				'targetNode': module.state.navigation.focusedChild,
				'selectionAttribute': module.props.attributes.selected,
				'selectionByValue': true,
			});

			updateViewState(targetView, module);
		}
	}
}

export default handleKeyupEvent;
