/**
 * @param {object} module - The class module.
 */

function addEmitterEvents(module) {
	module.emitter.add('get-grouped-filter-keys', (dataReady = false) => { 
		if (dataReady) {
			module.emitter.emit('add-grouped-filter-keys', module.props.group);
		}
	});

	module.emitter.add('get-filter-groups', (dataReady = false) => {
		if (dataReady) {
			module.emitter.emit('update-filter-group', module.state.filter);
		}
	});
}

export default addEmitterEvents;