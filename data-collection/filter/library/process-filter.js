import filterCollection from './filter-collection.js';

/**
 * 
 * @param {object} filter 
 * @param {object} params 
 */

function processFilter(module) {
	if (module.state.filtered) {
		const args = {
			'referenceData': module.data.ref,
			'filters': module.state.filters,
			'groupedKeys': module.state.groupedKeys,
			'deepFilter': module.props.deepFilter,
		};
		const collection = filterCollection(args);

		module.data.live.length = 0;
		module.data.live.push(...collection);
	} else {
		module.data.live.length = 0;
		module.data.live.push(...module.data.ref);
	}

	module.emitter.emit('update-presenter-state', { displaySize: module.data.live.length });
}

export default processFilter;