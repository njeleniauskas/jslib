import connectDataCollection from './connect-data-collection.js';
import updateCollectionName from './update-collection-name.js';
import updateState from './update-state.js';
import renderCollection from './render-collection.js';

/**
 * 
 * @param {object} params
 * @param {object} params.module
 * @param {object} params.emitter 
 */

function addEmitterEvents(params) {
	params.emitter.add('connect-data-collection', (args) => connectDataCollection(params.module, args));
	params.emitter.add('update-collection-name', (args) => updateCollectionName(params.module, args));
	params.emitter.add('update-presenter-state', (args) => updateState(params.module, args));
	params.emitter.add('process-collection', () => renderCollection(params.module), 3);
	params.emitter.add('process-render', () => renderCollection(params.module));
}

export default addEmitterEvents;