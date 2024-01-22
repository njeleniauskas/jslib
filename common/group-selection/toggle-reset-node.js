import setAttributeByToggle from '../utilities/set-attribute-by-toggle.js';
import setAttributeByValue from '../utilities/set-attribute-by-value.js';

/**
 * 
 * @param {object} params
 * @param {string} params.resetType - Class or attribute resetting.
 * @param {object} params.node - The reset node.
 * @param {string} params.pointer - The class or attribute used to handle state.
 * @param {boolean} params.resetByValue - Flag to use value or toggle attribute function.
 */

function toggleResetNode(params) {
	if (params.resetType === 'class') {
		params.node.classList.toggle(params.pointer);
	}

	if (params.resetType === 'attribute') {
		const attributeValue = params.node.getAttribute(params.pointer);
		const value = !JSON.parse(attributeValue);

		if (params.resetByValue) {
			setAttributeByValue(params.node, params.pointer, value);
		} else {
			setAttributeByToggle(params.node, params.pointer, value);
		}
	}
}

export default toggleResetNode;