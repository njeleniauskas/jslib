function getPrimaryNodes(module, params) {
	const passedContainer = 'container' in params && params.container instanceof HTMLElement;

	module.nodes.flow = passedContainer ? params.container : document.querySelector(`[${module.props.strings.flow}="${module.id}"]`);
}

export default getPrimaryNodes;
