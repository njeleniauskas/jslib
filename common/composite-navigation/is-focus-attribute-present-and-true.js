import getFocusValuesByAttribute from './get-focus-values-by-attribute.js';

/**
 * Check to see if a node has a focus attribute, and if that value is true.
 * @param {Object} params
 * @param {Object} params.node - The node in question.
 * @param {string} params.attribute - The attribute being looked for.
 * @returns {boolean}
 */

function isFocusAttributePresentAndTrue(params) {
	const node = params.node;
	const attribute = params.attribute;
	const state = getFocusValuesByAttribute(attribute);

	let hasAttribute = (attribute !== null);
	let attributeValueFocused;

	if (hasAttribute && attribute !== 'tabindex') {
		attributeValueFocused = (node.getAttribute(attribute) === state.focus);

		return attributeValueFocused;
	}

	return false;
}

export default isFocusAttributePresentAndTrue;
