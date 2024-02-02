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

//only a <select> select event, and single control filter-groups.
function handleComparisonEvent(params) {
	const value = params.targetNode.value;
	const methodAttribute = params.props.attributes.method;
	const args = {
		'type': params.props.type,
		'group': params.props.group,
		'nodes': params.nodes.control,
		'attributes': params.props.attributes,
		'indicators': params.props.indicators,
		'multiSelection': params.props.multiSelection,
		'selectionByValue': params.props.selectionByValue
	};

	params.nodes.control.forEach((node) => {
		if (node.hasAttribute(methodAttribute) && node.getAttribute(methodAttribute) !== value) {
			node.setAttribute(methodAttribute, value);

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
	});
}

export default handleComparisonEvent;