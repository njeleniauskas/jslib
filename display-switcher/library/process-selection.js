import updateSingleSelection from '../../common/group-selection/update-single-selection.js';
import updateViewState from './update-view-state.js';

function processSelection(params) {
	const { module, targetChild } = params;

	const isSelected = targetChild.getAttribute(module.props.attributes.selected) === 'true';

	if (!isSelected) {
		const targetID = targetChild.getAttribute(module.props.attributes.controlID);

		updateSingleSelection(module.state.nodes.children, {
			'targetNode': targetChild,
			'selectionAttribute': module.props.attributes.selected,
			'selectionByValue': true,
		});

		updateViewState(module, targetID);
	}
}

export default processSelection;
