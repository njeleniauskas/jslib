function getNodes(module, params) {
	module.controls = Array.from(document.querySelectorAll(`[${module.props.strings.control}]`));

	if (module.props.strings.animationNodes !== null) {
		module.nodes = Array.from(document.querySelectorAll(`[${module.props.strings.animationNode}]`));
	}
}

export default getNodes;