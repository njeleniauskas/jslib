import setAttributeByValue from '../utilities/set-attribute-by-value.js';
import setAttributeByToggle from '../utilities/set-attribute-by-toggle.js';

/**
 * 
 * @param {object} nodes - The nodes that can be selected.
 * @param {object} params 
 * @param {boolean} params.selectionByValue - Whether the selection is represented by a value, or the existence of an attribute.
 * @param {boolean} params.multiSelection - Single or multiselection behavior.
 * @param {string} params.attribute - The selection attribute.
 */

function resetGroupSelection(nodes, params) {
	let setFunction = setAttributeByValue;

	if (!params.selectionByValue) {
		setFunction = setAttributeByToggle;
	}

	for (const [index, node] of nodes.entries()) {
		let value = false;

		if (!params.multiSelection && index === 0) {
			value = true;
		}

		setFunction(node, params.attribute, value);
	}
}

export default resetGroupSelection;