import updateGroupSelection from '../../common/group-selection/update-group-selection.js';
import updateSingleSelection from '../../common/group-selection/update-single-selection.js';
import updateMultipleSelection from '../../common/group-selection/update-multi-selection.js';
import toggleResetNode from '../../common/group-selection/toggle-reset-node.js';

import updateFilterState from './update-filter-state.js';
import getResetNodeConditions from './get-reset-node-conditions.js';
import broadcastEmitterEvents from './broadcast-emitter-events.js';

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
			'indicatorVisible': params.props.indicators.resetVisible,
		});

		if (isValidResetCondition) {
			toggleResetNode({
				'node': params.nodes.reset,
				'indicatorVisible': params.props.indicators.resetVisible,
				'indicatorHidden': params.props.indicators.resetHidden,
				'timing': params.props.resetTiming,
			});
		}

		if (params.state.active) {
			broadcastEmitterEvents({
				emitter: params.emitter,
				props: params.props,
				component: params.nodes.group,
				state: params.state,
			});
		}
	}
}

export default handleBinaryEvent;