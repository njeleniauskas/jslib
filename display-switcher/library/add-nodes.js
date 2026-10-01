function addNodes(module) {
	const queryString = `[${module.props.attributes.viewNode}="${module.id}"]`;
	module.nodes.views = Array.from(document.querySelectorAll(queryString));
}

export default addNodes;
