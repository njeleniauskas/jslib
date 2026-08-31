function getNodes(module) {
	module.nodes.control = document.querySelector(`[${module.props.attributes.control}]`);
	module.nodes.target = document.querySelector(`[${module.props.attributes.target}]`);
}

export default getNodes;
