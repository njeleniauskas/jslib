import connectDataCollection from './connect-data-collection.js';
import handleFilterGroupUpdate from './handle-filter-group-update.js';
import addFilterGroups from './add-filter-groups.js';
import processFilter from './process-filter.js';

/**
 * @param {object} module - The class module.
 */

function addEmitterEvents(module) {
	module.emitter.add('connect-data-collection', (args) => connectDataCollection(module, args))
	module.emitter.add('update-filter-group', (args) => handleFilterGroupUpdate(module, args));
	module.emitter.add('add-grouped-filter-keys', (args) => addFilterGroups(module, args));
	module.emitter.add(`process-collection-${module.id}`, () => processFilter(module), 0);
}

export default addEmitterEvents;