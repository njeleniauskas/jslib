import fetchJSON from '../../../common/utilities/fetch-json.js';
import convertObjectToArray from '../../../common/utilities/convert-object-to-array.js';
import invalidPropertyValue from '../../../common/utilities/invalid-property-value.js';

import presortCollection from './presort-collection.js';
import prefilterCollection from './prefilter-collection.js';

/**
 * 
 * @param {string} filepath 
 * @param {object} params
 * @param {string} params.objectKeyName - The object property name for a named object's key.
 * @param {string} params.presort - The attribute property to sort by.
 * @param {string} params.prefilter - The attribute property to sort by.
 * @param {string[asc|desc]} params.presortDirection  - The sort direction (asc or desc).
 */

async function collectData(filepath, params) {
	const JSON = await fetchJSON(filepath); 
	let results = [];

	if (typeof JSON === 'object' && !Array.isArray(JSON)) {
		results = convertObjectToArray(JSON, params.objectKeyName);
	} else {
		results = JSON;
	}

	if (!invalidPropertyValue(params, 'prefilter') && Object.keys(params.prefilter).length !== 0) {
		results = prefilterCollection(results, {
			'prop': params.prefilter.prop,
			'value': params.prefilter.value
		})
	}

	if (!invalidPropertyValue(params, 'presort') && Object.keys(params.presort).length !== 0) {
		results = presortCollection(results, {
			'prop': params.presort.prop,
			'direction': params.presort.direction
		});
	}

	return results;
}

export default collectData;