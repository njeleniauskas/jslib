import validateConfig from './library/validate-config.js';
import getCollectionArgs from './library/get-collection-args.js';
import validateCollectionArgs from './library/validate-collection-args.js';
import collectData from './library/collect-data.js';
import handleErrors from '../../common/utilities/handle-errors.js';

/**
 * The core DataCollection class, containing the reference and live datasets.
 * @param {object} params
 * @param {string | number} params.id - The ID to connect each class together.
 * @param {object} params.emitter - The event emitter.
 *
 * @param {object} [params.data] - The arguments needed (and optional) for data collection.
 * @param {string} [params.data.name] - The human-readable name of the collection (akin to aria-label or name attribute).
 * @param {string} params.data.resource - The uri of the resource needed.
 * @param {string} [params.data.type] - The type of resource being requested [file, or query].
 * @param {object} [params.data.body] - The requestBody for query function use.
 * @param {object} [params.data.args]
 * @param {string} [params.data.args.objectKeyName] - The property name for the key that will store the object property key. When the JSON is a map (not an array of objects).
 * @param {{prop: string, value: string}[]}} [params.data.args.prefilter] - An array of prefilter key/value objects. * @param {object} [params.data.args.presort]
 * @param {string} [params.data.args.presort.prop] - The object property to sort by.
 * @param {'asc' | 'desc'} [params.data.args.presort.direction] - The sort direction needed.
 */

class DataCollection {
	constructor(params) {
		this.id = null;
		this.props = {
			name: null,
			resource: null,
			type: null,
			body: null,
			args: {
				objectKeyName: null,
				prefilter: null,
				presort: null,
			}
		};
		this.emitter = null;
		this.data = {
			ref: null,
			live: null,
		};

		this.#init(params);
	}

	#init (params) {
		try {
			validateConfig(params);
			this.#setConfiguration(params);
		} catch (errors) {
			handleErrors(errors);
		}
	}

	#setConfiguration(params) {
		const { data: { args = {}, ...data } = {}, ...props } = params;

		this.props = {...this.props, ...data};
		this.props.args = { ...this.props.args, ...args };
		this.emitter = props.emitter;
		this.id = props.id;
	}

	async getCollection(params) {
		try {
			const args = getCollectionArgs(params, this);

			validateCollectionArgs(args);

			this.props = {...this.props, ...args};

			this.data.ref = await collectData(args.type, args);
			//shallow copy (prevents ref mutation errors)
			this.data.live = this.data.ref.slice();
			this.emitter.emit('connect-data-collection', this);
		} catch (errors) {
			handleErrors(errors);
		}
	}
};

export default DataCollection;
