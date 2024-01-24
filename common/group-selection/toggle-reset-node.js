import setAttributeByToggle from '../utilities/set-attribute-by-toggle.js';
import setAttributeByValue from '../utilities/set-attribute-by-value.js';

/**
 * 
 * @param {object} params
 * @param {object} params.node - The reset node.
 * @param {string} params.pointerVisibility - The attribute used to handle the visibility of the reset node.
 * @param {string} params.pointerChange - The class used to handle the transition of the element (if needed).
 * @param {boolean} params.resetByValue - Flag to use value or toggle attribute function.
 * @param {boolean} [params.resetVisibilityValue] - Flag that indicates that the element is visible when the attribute's value is false.
 * @param {number} params.timing - The delay window to trigger the pointerVisibility attribute to "hidden".
 */

function toggleResetNode(params) {
	let visibilityValue;
	let value;
	let setFunction;
	let isVisible;

	if (params.resetByValue) {
		visibilityValue = params.node.getAttribute(params.pointerVisibility);
		value = !JSON.parse(visibilityValue);
		setFunction = setAttributeByValue;
		isVisible = (params.resetVisibilityValue !== value);
	} else {
		visibilityValue = params.node.hasAttribute(params.pointerVisibility);
		value = !visibilityValue;
		setFunction = setAttributeByToggle;
		isVisible = params.node.hasAttribute(params.pointerVisibility);
	}
	
	if (!isVisible) {
		params.node.classList.add(params.pointerChange);
		setFunction(params.node, params.pointerVisibility, value);
	} else {
		params.node.classList.remove(params.pointerChange);
		setTimeout(() => {
			setFunction(params.node, params.pointerVisibility, value);
		}, params.timing);
	}
}

export default toggleResetNode;