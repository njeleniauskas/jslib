import resetGroupSelection from '../../common/group-selection/reset-group-selection.js';
import filterStateEmpty from './filter-state-empty.js';
import getToggleNodeState from './get-toggle-node-state.js';
import updateFilterState from './update-filter-state.js';
import broadcastEmitterEvents from './broadcast-emitter-events.js';

/**
 * @param {object} params 
 * @param {object} params.props
 * @param {array} params.nodes 
 * @param {object} params.targetNode
 * @param {object} params.state 
 * @param {object} params.emitter 
 */

function handleToggleEvent(params) {
	const toggleAttribute = params.props.indicators.toggle;

	if (params.toggleByValue) {
		const value = params.targetNode.getAttribute(toggleAttribute) === 'true' ? false : true;

		params.targetNode.setAttribute(toggleAttribute, value);
		params.state.active = value;
	} else {
		const nodeType = ['checkbox', 'radio'];
		params.targetNode.toggleAttribute(toggleAttribute);

		if (nodeType.some(type => type === params.targetNode.type) && 
		!params.targetNode.checked) {
			params.targetNode.removeAttribute(toggleAttribute);
		}
		
		params.state.active = getToggleNodeState({
			'toggleByValue': params.props.toggleByValue,
			'node': params.targetNode,
			'attribute': toggleAttribute,
		});
	}

	if (!params.state.active && params.props.toggleResetsFilter) {
		if (params.props.type !== 'input') {
			resetGroupSelection(params.nodes.control, {
				'selectionByValue': params.props.selectionByValue,
				'multiSelection': params.props.multiSelection,
				'attribute': params.props.indicators.selected
			});
		} else {
			params.nodes.control.forEach((node) => {
				node.value = '';
			});
		}

		//Note: only one node supported at this time
		//Note: dispatch will trigger the updateFilterState event in the comparison handler.
		if ('comparison' in params.nodes) {
			params.nodes.comparison.selectedIndex = 0;
			params.nodes.comparison.dispatchEvent(new Event('change'));
		}
	}

	if (!filterStateEmpty(params.state.filter)) {
		const stateArgs = {
			'type': params.props.type,
			'group': params.props.group,
			'nodes': params.nodes.control,
			'attributes': params.props.attributes,
			'indicators': params.props.indicators,
			'multiSelection': params.props.multiSelection,
			'selectionByValue': params.props.selectionByValue
		};
	
		updateFilterState(params.state, stateArgs);
	}

	broadcastEmitterEvents({
		emitter: params.emitter,
		props: params.props,
		component: params.nodes.group,
		state: params.state,
	});
}

export default handleToggleEvent;