import isFocusAttributePresentAndTrue from './is-focus-attribute-present-and-true.js';

/**
 * Check to see if the component is currently focused.
 * @param {node} element - The element being tested.
 * @param {string} attribute - The attribute to test against (when native focus isn't available).
 * @returns {boolean}
 */

function isElementFocused(element, attribute) {
	if (element === document.activeElement) {
		return true;
	}

	return isFocusAttributePresentAndTrue({
		'node': element,
		'attribute': attribute,
	});
}

export default isElementFocused;
