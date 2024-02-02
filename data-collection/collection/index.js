import validateConfig from './library/validate-config.js';
import collectData from './library/collect-data.js';

/**
 * The core DataCollection class, containing the reference and live datasets.
 * @param {object} params
 * @param {string} [params.name] - The human-readable name of the collection (akin to aria-label or name attribute).
 * @param {string} [params.filepath] - The path and filename of the data needed.
 * @param {string} [params.objectKeyName] - The property name for the key that will store the object property key. When the JSON is an object of objects (not an array of objects).
 * @param {object} [params.prefilter]
 * @param {string} [params.prefilter.prop] - The object property to filter by.
 * @param {string} [params.prefilter.value] - The property value to include.
 * @param {object} [params.presort] 
 * @param {string} [params.presort.prop] - The object property to sort by.
 * @param {'asc' | 'desc'} [params.presort.direction] - The sort direction needed.
 * @param {object} params.emitter - The event emitter.
 */

class DataCollection {
	constructor(params) {
		this.props = {
			name: null,
			filepath: null,
			objectKeyName: null,
			prefilter: null,
			presort: null,
		};
		this.emitter = null;
		this.data = {
			ref: null,
			live: null,
		};

		this.init(params);
	}
	
	init (params) {
		try {
			validateConfig(params);
			this.setConfiguration(params);
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
		const {emitter, ...props} = params;

		this.props = {...this.props, ...props};
		this.emitter = params.emitter;
	}


	//public methods
	async getCollection(params) {
		try {
			const args = {};
			
			if (params !== undefined && !('filepath' in params)) {
				throw new Error ('getCollection: A filepath must be provided if supplying an object with arguments.');
			}

			if (params !== undefined && 'filepath' in params) {
				if (!('name' in params)) {
					throw new Error ('getColltion: A name must be provided when including a filepath.');
				}

				args.filepath = params.filepath;
				args.name = params.name;
				args.objectKeyName = 'objectKeyName' in params ? params.objectKeyName : null;
				args.prefilter = 'prefilter' in params ? params.prefilter : null;
				args.presort = 'presort' in params ? params.presort : null;

				this.props = {...this.props, ...args};
			} else {
				args.filepath = this.props.filepath;
				args.name = this.props.name;
				args.objectKeyName = this.props.objectKeyName;
				args.prefilter = this.props.prefilter;
				args.presort = this.props.presort;
			}

			if (args.filepath === null) {
				throw new Error('getCollection: No filepath was provided. Cannot fetch dataset.');
			}

			this.data.ref = await collectData(args.filepath, args);

			//shallow copy (prevents ref mutation errors)
			this.data.live = this.data.ref.slice();
			this.emitter.emit('connect-data-collection', this);
		} catch (error) {
			console.error(error);
		}
	}
}

export default DataCollection;