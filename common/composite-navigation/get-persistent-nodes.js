/**
 * Gather the nodes needed for the function to work from the DOM.
 * @param {Object} params
 * @param {string} params.id - Identifies the specific context needed.
 * @param {Object} params.nodes - The object describing the properties needed to gather nodes.
 * @param {boolean} params.nodes.array - Identifies if the attribute is for an array of nodes.
 * @param {Object} params.nodes.attribute - The target attribute.
 * @returns {Object} The nodes needed for operation.
 */

function getPersistentNodes(params) {
	const id = params.id;
	const nodes = {};
	const lookup = new Map();

	for (const key of Object.keys(params.nodes)) {
		const branch = params.nodes[key];
		const attribute = branch.attribute;

		if (!lookup.has(attribute)) {
			const queryString = `[${attribute}="${id}"]`;
			const elements = branch.array ?
				Array.from(document.querySelectorAll(queryString)) : document.querySelector(queryString);

			nodes[key] = elements;
			lookup.set(attribute, elements);
		} else {
			const lookupValue = lookup.get(attribute);
			const isArray = Array.isArray(lookupValue);

			nodes[key] = branch.array ?
				(isArray ? lookupValue : [lookupValue]) :
				(isArray ? lookupValue[0] : lookupValue)
		}
	}

	return nodes;
}

export default getPersistentNodes;
