import setMultiSelectionByToggle from './set-multi-selection-by-toggle.js';
import setMultiSelectionByValue from './set-multi-selection-by-value.js';

/**
 * Updating a mutli-selection control group.
 * @param {array} nodes - The array of controls in a control group.
 * @param {object} params - Arguments passed to the function.
 * @param {boolean} params.selectionByValue - Whether the selection is given a boolean value, or the attribute is added/removed.
 * @param {object} params.targetNode - The node that triggered the event.
 * @param {string} params.selectionAttribute - The selection attribute to update.
 * @param {string} params.resetAttribute - The attribute flagging the reset control.
 */

function updateMultipleSelection(nodes, params) {
	const {selectionByValue, ...args} = params;

	if (params.selectionByValue) {
		setMultiSelectionByValue(nodes, args);
	} else {
		setMultiSelectionByToggle(nodes, args);
	}
}

export default updateMultipleSelection;