import isFocusAttributePresentAndTrue from './is-focus-attribute-present-and-true.js';

/**
 * Check to see if the component is currently focused.
 * @param {Object} params - An object containing all parameters.
 * @param {Object} params.node - The node being considered.
 * @param {string} params.focusAttribute - The attribute that needs to be evaluated.
 * @returns {boolean}
 */

function isElementFocused(params) {
	const node = params.node;
	const focusAttribute = params.focusAttribute;

	let isFocused = false;

	if (focusAttribute === 'tabindex') {
		isFocused = (document.activeElement === node);
	} else {
		isFocused = isFocusAttributePresentAndTrue({
			'attribute': focusAttribute,
			'node': node
		});
	}
	
	return isFocused;
}

export default isElementFocused;