function setPersistentNodes(module, nodes) {
	const keys = Object.keys(nodes);

	keys.forEach((key) => {
		module.nodes[key] = nodes[key];
	});
}

export default setPersistentNodes;
