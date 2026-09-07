/**
 * @param {object} nodes - The object containing each node to map to the class nodes object.
 * @param {class} module - The class module.
 */

function setDomNodes(nodes, module) {
	const keys = Object.keys(nodes);

	keys.forEach((key) => {
		module.data.nodes[key] = nodes[key];
	});
}

export default setDomNodes;
