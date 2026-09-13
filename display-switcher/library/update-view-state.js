function updateViewState(module, controlID) {
	const displayAttribute = module.props.attributes.display;
	const targetView = module.nodes.views.find((view) => view.getAttribute(module.props.attributes.viewID) === controlID);

	module.nodes.views.forEach((view) => {
		if (view === targetView) {
			view.setAttribute(displayAttribute, 'false')
		} else {
			view.setAttribute(displayAttribute, 'true')
		}
	});
}

export default updateViewState;
