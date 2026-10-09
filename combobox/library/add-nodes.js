function addNodes(module) {
	const id = `[${module.props.attributes.context}="${module.id}"]`;
	const attribute = module.props.attributes.contextRole;

	module.nodes.collection = document.querySelector(`${id}[${attribute}="collection"]`);
	module.nodes.initialContext = document.querySelector(`${id}[${attribute}="component"]`);
}

export default addNodes;
