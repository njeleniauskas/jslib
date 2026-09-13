/**
 * Get the index of a target element by its attribute value.
 * @param {Object} params
 * @param {array} params.elements - The array of elements to evaluate.
 * @param {string} params.attribute - The attribute being looked for.
 * @param {string} params.value - The value to check against.
 * @returns {number}
 */

function getElementIndexByAttribute(params) {
	return params.elements.findIndex((element) => element.getAttribute(params.attribute) === params.value);
}

export default getElementIndexByAttribute;
