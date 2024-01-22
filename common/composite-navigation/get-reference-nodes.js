/**
 * Gather the nodes needed for the function to work from the DOM.
 * @param {Object} params - An object containing all parameters.
 * @param {string} params.id - Identifies the specific context needed.
 * @param {Object} params.nodes - The object describing the properties needed to gather nodes.
 * @param {boolean} params.nodes.array - Identifies if the attribute is for an array of nodes.
 * @param {Object} params.nodes.attribute - The target attribute.
 * @returns {Object} The nodes needed for operation.
 */

function getReferenceNodes(params) {
	const id = params.id;
	const keys = Object.keys(params.nodes);
	const nodes = {};

	for (let i = 0, len = keys.length; i < len; i++) {
		let currentItem = params.nodes[keys[i]];
		let currentAttribute = currentItem.attribute;
		let queryString = `[${currentAttribute}="${id}"]`;
		let isConditionOne = false;
		let isArray = currentItem.array;

		if (i === 0) {
			isConditionOne = true;
		}

		if (i >= 1) {
			for (let j = 0; j < len; j++) {
				let checkedItem = params.nodes[keys[j]];
				let hasAttribute = false;

				if (currentAttribute === checkedItem.attribute) {
					hasAttribute = true;	
				}

				if (hasAttribute && keys[j] in nodes) {
					if (currentItem.array && !checkedItem.array) {
						nodes[keys[i]] = [];
						nodes[keys[i]][0] = nodes[keys[j]];
					} else {
						nodes[keys[i]] = nodes[keys[j]];
					}
					
					isConditionOne = false;
				} else {
					isConditionOne = true;
				}
			}
		}

		if (isConditionOne) {
			if (isArray) {
				nodes[keys[i]] = [];
				nodes[keys[i]] = Array.from(document.querySelectorAll(queryString));
			} else {
				nodes[keys[i]] = document.querySelector(queryString);
			}
		}
	}

	return nodes;
}

export default getReferenceNodes;