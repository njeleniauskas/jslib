/**
 * @param {string} targetValue - The target attribute value for identifying display sections to show.
 * @param {class} module - The class module.
 */

function updateViewState(targetValue, module) {
	module.data.nodes.views.forEach((view) => {
		const viewID = view.getAttribute(module.props.attributes.viewID);

		if (viewID === targetValue) {
			view.setAttribute(module.props.attributes.display, 'false');
		} else {
			view.setAttribute(module.props.attributes.display, 'true');
		}
	});
}

export default updateViewState;
