import inputValueMatchesFilter from './input-value-matches-filter.js';
import updateFilterState from './update-filter-state.js';
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

function handleInputEvent(params) {
	const valuesMatch = inputValueMatchesFilter(params.state.filter, params.targetNode);

	if (!valuesMatch) {
		const args = {
			'type': params.props.type,
			'group': params.props.group,
			'nodes': params.nodes.control,
			'attributes': params.props.attributes,
			'indicators': params.props.indicators,
			'multiSelection': params.props.multiSelection,
			'selectionByValue': params.props.selectionByValue
		};

		updateFilterState(params.state, args);

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

export default handleInputEvent;