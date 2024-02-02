import connectDataCollection from './connect-data-collection.js';
import updateCollectionName from './update-collection-name.js';
import updateState from './update-state.js';
import renderCollection from './render-collection.js';

/**
 * @param {object} module - The class module.
 */

function addEmitterEvents(module) {
	module.emitter.add('connect-data-collection', (args) => connectDataCollection(module, args));
	module.emitter.add('update-collection-name', (args) => updateCollectionName(module, args));
	module.emitter.add('update-presenter-state', (args) => updateState(module, args));
	module.emitter.add('process-collection', () => renderCollection(module), 3);
	module.emitter.add('process-render', () => renderCollection(module));
}

export default addEmitterEvents;