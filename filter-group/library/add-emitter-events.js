/**
 * 
 * @param {object} params 
 * @param {object} params.emitter 
 * @param {string} params.group 
 * @param {object} params.filter - The FilterGroup component's filter object.
 */

function addEmitterEvents(params) {
	params.emitter.add('get-grouped-filter-keys', (dataReady = false) => { 
		if (dataReady) {
			params.emitter.emit('add-grouped-filter-keys', params.group);
		}
	});

	params.emitter.add('get-filter-groups', (dataReady = false) => {
		if (dataReady) {
			params.emitter.emit('update-filter-group', params.filter);
		}
	});
}

export default addEmitterEvents;