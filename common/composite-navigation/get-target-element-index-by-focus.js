/**
 * Get the index of a target element based on whether selection is possible.
 * @param {Object} params - An object containing all parameters.
 * @param {boolean} params.selection
 * @param {array} params.array - The array to look for the node with the correct index.
 * @param {string} [params.selectedAttribute] - The target attribute being looked for.
 * @returns {number}
 */

function getTargetElementIndexByFocus(params) {
	let index = 0;

	if ('selectedAttribute' in params && params.selection === true) {
		params.array.forEach((element) => {
			let hasAttribute = element.hasAttribute(params.selectedAttribute)
			let attributeValue = null;

			if (hasAttribute) {
				attributeValue = element.getAttribute(params.selectedAttribute);
			}

			if (hasAttribute && attributeValue === 'true') {
				index = params.array.indexOf(element);
			}
		});
	}

	return index;
}

export default getTargetElementIndexByFocus;