/**
 * 
 * @param {object} params 
 * @param {string} params.id - The id of the data attribute. 
 * @param {object} params.attributes - The collection data- attribute names.
 * @returns object of DOM nodes.
 */

function getPresenterNodes(params) {
	const nodes = {};

	for (const [key, value] of Object.entries(params.attributes)) {
		let string = `[${value}="${params.id}"]`;

		if (key === 'liveRegion') {
			string = `${value}`;
		}
		
		nodes[key] = document.querySelector(string);
	}

	return nodes;
}

export default getPresenterNodes;