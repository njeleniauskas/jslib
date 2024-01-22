import connectDataCollection from './connect-data-collection.js';
import handleFilterGroupUpdate from './handle-filter-group-update.js';
import addFilterGroups from './add-filter-groups.js';
import processFilter from './process-filter.js';

/**
 * 
 * @param {*} params 
 * @param {*} params.module
 * @param {*} params.emitter
 */

function addEmitterEvents(params) {
	params.emitter.add('connect-data-collection', (args) => connectDataCollection(params.module, args))
	params.emitter.add('update-filter-group', (args) => handleFilterGroupUpdate(params.module, args));
	params.emitter.add('add-grouped-filter-keys', (args) => addFilterGroups(params.module, args));
	params.emitter.add('process-collection', () => processFilter(params.module), 0);
}

export default addEmitterEvents;