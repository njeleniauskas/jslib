import fetchJSON from '../../../common/utilities/fetch-json.js';
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
	file: async ({ resource }) => {
		return await fetchJSON(resource);
	},
	query: ({ resource, body }) => {
		console.warn('This is a stub function. Not ready for use.')
	}
};

async function collectData(type, params) {
	const resolver = resolvers[type];
	const data = await resolver(params)
	let results = [];

	if (typeof data === 'object' && !Array.isArray(data)) {
		results = convertObjectToArray(data, params.objectKeyName);
	} else {
		results = data;
	}

	const args = (params.args ?? {});

	if (validPropertyValue(args, 'prefilter') && Object.keys(args.prefilter).length !== 0) {
		results = prefilterCollection(results, args.prefilter);
	}

	if (validPropertyValue(args, 'presort') && Object.keys(args.presort).length !== 0) {
		results = presortCollection(results, {
			'prop': args.presort.prop,
			'direction': args.presort.direction
		});
	}

	return results;
}

export default collectData;
