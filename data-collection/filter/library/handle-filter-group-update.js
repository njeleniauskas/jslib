import emptyObject from '../../../common/utilities/empty-object.js';
import updateFilterGroup from './update-filter-group.js';

/**
 * 
 * @param {object} module - The filter module.
 * @param {object} filterGroup - The filter group passed from a FilterGroup component.
 */

function handleFilterGroupUpdate(module, filterGroup) {
	updateFilterGroup(module.state.filters, filterGroup);
	
	if (emptyObject(module.state.filters)) {
		module.state.filtered = false;
	} else {
		module.state.filtered = true;
	}

	if (module.state.ready) {
		if (module.state.filtered || !module.state.filtered && (module.data.ref.length !== module.data.live.length)) {
			module.emitter.emit('process-collection');
		}
	}
}

export default handleFilterGroupUpdate;