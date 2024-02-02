import data from '../data/data.js';

/**
 * @param {object} nodes - The object containing each node to map to the class nodes object.
 */

function setReferenceNodes(nodes) {
	const keys = Object.keys(nodes);

	keys.forEach((key) => {
		data.nodes[key] = nodes[key];
	});
}

export default setReferenceNodes;