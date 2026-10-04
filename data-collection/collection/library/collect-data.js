import convertObjectToArray from '../../../common/utilities/convert-object-to-array.js';
import validPropertyValue from '../../../common/utilities/valid-property-value.js';

import presortCollection from './presort-collection.js';
import prefilterCollection from './prefilter-collection.js';

/**
 * @param {string} type - The type of function used to fetch data.
 * @param {object} params
 * @param {string} params.objectKeyName - The object property name for a named object's key.
 * @param {string} params.presort - The attribute property to sort by.
 * @param {string} params.prefilter - The attribute property to sort by.
 * @param {string[asc|desc]} params.presortDirection  - The sort direction (asc or desc).
 *
 *
 * @param {string} params.resource - The resouce to draw from.
 */

const resolvers = {
	object: ({ resource }) => {
		return resource;
	},
	fetch: async ({ resource, options }) => {
		const response = await fetch(resource, options);

		if (!response.ok) throw new Error(`Fetch: ${response.error}`);

		return await response.json();
	}
}

async function collectData(type, params) {
	const resolver = resolvers[type];
	const data = await resolver(params);
	let results = handleData(data, params);

	if ('transform' in params) {
		const transform = (params.transform ?? {});

		if (validPropertyValue(transform, 'prefilter') && Object.keys(transform.prefilter).length !== 0) {
			results = prefilterCollection(results, transform.prefilter);
		}

		if (validPropertyValue(transform, 'presort') && Object.keys(transform.presort).length !== 0) {
			results = presortCollection(results, {
				'prop': transform.presort.prop,
				'direction': transform.presort.direction
			});
		}
	}

	return results;
}

function handleData(data, params) {
	if (typeof data !== 'object' || data === null) {
		throw new Error('data is not a valid shape (object or array required).');
	}

	if (typeof data === 'object' && !Array.isArray(data)) {
		if ('transform' in params) {
			return convertObjectToArray(data, params.transform.objectKeyName);
		} else {
			throw new Error('Transform key missing.');
		}
	}

	return data;
}

export default collectData;
