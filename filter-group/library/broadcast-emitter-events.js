/**
 * @param {object} params
 * @param {object} params.emitter
 * @param {object} params.props
 * @param {object} params.component - The component node.
 * @param {object} params.state
 */

function broadcastEmitterEvents(params) {
	params.emitter.emit('update-filter-group', params.state.filter);
}

export default broadcastEmitterEvents;