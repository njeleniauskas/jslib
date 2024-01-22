import setAttributeByValue from '../utilities/set-attribute-by-value.js';
import setAttributeByToggle from '../utilities/set-attribute-by-toggle.js';

/**
 * Updating a single-selection control group.
 * @param {array} nodes - The nodes in the control group.
 * @param {object} params - Arguments passed to the function.
 * @param {boolean} params.selectionByValue - Whether the selection is given a boolean value, or the attribute is added/removed.
 * @param {object} params.targetNode - The node that triggered the event.
 * @param {string} params.selectionAttribute - The selection attribute.
 */

function updateSingleSelection(nodes, params) {
	nodes.forEach((node) => {
		let value = node === params.targetNode ? true : false;

		if (params.selectionByValue) {
			setAttributeByValue(node, params.selectionAttribute, value);
		} else {
			setAttributeByToggle(node, params.selectionAttribute, value);
		}
	});
}

export default updateSingleSelection;