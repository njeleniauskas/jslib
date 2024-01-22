import getFocusValuesByAttribute from './get-focus-values-by-attribute.js';

/**
 * Check to see if a node has a focus attribute, and if that value is true.
 * @param {Object} params - An object containing all parameters.
 * @param {string} params.attribute - The attribute being looked for.
 * @param {Object} params.node - The node in question.
 * @returns {boolean}
 */

function isFocusAttributePresentAndTrue(params) {
	const attribute = params.attribute;
	const node = params.node;
	const elementState = getFocusValuesByAttribute(attribute);

	let hasAttribute = (attribute !== null);
	let attributeValueFocused;

	if (hasAttribute && attribute !== 'tabindex') {
		attributeValueFocused = (node.getAttribute(attribute) === elementState.focus);

		return attributeValueFocused;
	}

	return false;
}

export default isFocusAttributePresentAndTrue;