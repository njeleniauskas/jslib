import validateConfig from './library/validate-config.js';
import addEmitterEvents from './library/add-emitter-events.js';

/**
 * DataCollection filter class.
 * @param {object} params
 * @param {object} params.data - The DataCollection.data object.
 * @param {object} params.emitter - The event emitter tying functionality together.
 * @param {number} [params.delay] - The delay window for processing input events (keyup). The defuault is 250ms.
 * @param {boolean} [params.deepFilter] - Whether the filter process is shallow or deep. Deep uses recursion to find any nested property.
 */

class DataCollectionFilter {
	constructor(params) {
		this.id = null;
		this.props = {
			delay: 250,
			deepFilter: false,
		};
		this.emitter = null;
		this.data = null;
		this.state = {
			filters: {},
			groupedKeys: {},
			filtered: false,
			ready: false
		};

		this.init(params);
	}
	
	init(params) {
		try {
			validateConfig(params);
			this.setConfiguration(params);
			addEmitterEvents(this);
		} catch (errors) {
			if (errors instanceof AggregateError) {
				console.error(errors.message)
				
				for (const error of errors.errors) {
					console.error(error.message);
				}
			} else {
				console.error(errors);
			}
		}
	}
	
	setConfiguration(params) {
		const {emitter, id, ...args} = params;
		this.props = {...this.props, ...args};
		this.emitter = params.emitter;
		this.id = params.id;
	}

	
	//public methods
	getFilterGroups() {
		this.emitter.emit('get-filter-groups', true);
		this.state.ready = true;
	}

	getGroupedFilterKeys() {
		this.emitter.emit('get-grouped-filter-keys', true);
	}
}

export default DataCollectionFilter;