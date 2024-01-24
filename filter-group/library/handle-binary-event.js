import updateGroupSelection from '../../common/group-selection/update-group-selection.js';
import updateSingleSelection from '../../common/group-selection/update-single-selection.js';
import updateMultipleSelection from '../../common/group-selection/update-multi-selection.js';
import toggleResetNode from '../../common/group-selection/toggle-reset-node.js';

import updateFilterState from './update-filter-state.js';
import getResetNodeConditions from './get-reset-node-conditions.js';

/**
 * 
 * @param {object} params 
 * @param {object} params.props
 * @param {array} params.nodes 
 * @param {object} params.targetNode
 * @param {object} params.state 
 * @param {object} params.emitter 
 */

function handleBinaryEvent(params) {
	const args = {
		'nodes': params.nodes,
		'selectionByValue': params.props.selectionByValue,
		'targetNode': params.targetNode,
		'selectionAttribute': params.props.indicators.selected,
	};
	let update = false;
	let updateFunction;

	if (!params.props.multiSelection) {
		if (params.targetNode.getAttribute(params.props.indicators.selected) === 'false') {
			update = true;
			updateFunction = updateSingleSelection;
		}
	}

	if (params.props.multiSelection) {
		args.resetAttribute = params.props.attributes.reset;
		
		update = true;
		updateFunction = updateMultipleSelection;
	}

	if (update) {
		const stateArgs = {
			'type': params.props.type,
			'group': params.props.group,
			'nodes': params.nodes.control,
			'attributes': params.props.attributes,
			'indicators': params.props.indicators,
			'multiSelection': params.props.multiSelection,
			'selectionByValue': params.props.selectionByValue
		};

		updateGroupSelection(params.nodes.control, updateFunction, args);
		updateFilterState(params.state, stateArgs);

		const isValidResetCondition = getResetNodeConditions({
			'nodes': params.nodes,
			'hasReset': 'reset' in params.props.attributes,
			'multiSelection': params.props.multiSelection,
			'filter': params.state.filter,
			'pointerVisibility': params.props.indicators.resetVisibility,
			'pointerChange': params.props.indicators.resetChange,
			'resetByValue': params.props.resetByValue,
			'resetVisibilityValue': params.props.resetVisibilityValue,
		});

		if (isValidResetCondition) {
			toggleResetNode({
				'node': params.nodes.reset,
				'pointerVisibility': params.props.indicators.resetVisibility,
				'pointerChange': params.props.indicators.resetChange,
				'resetByValue': params.props.resetByValue,
				'resetVisibilityValue': params.props.resetVisibilityValue,
				'timing': params.props.resetTiming,
			});
		}

		if (params.state.active) {
			params.emitter.emit('update-filter-group', params.state.filter);
		}
	}
}

export default handleBinaryEvent;