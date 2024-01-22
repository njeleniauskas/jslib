import isObject from '../../../common/utilities/is-object.js';
import isArrayOfObjects from '../../../common/utilities/is-object.js';

import testFilterGroup from './test-filter-group.js';

/**
 * Recrusive function to walk through nested object properties, and test their results.
 * @param {object} results 
 * @param {object} object 
 * @param {object} filters 
 * @returns Object or Object[key]
 */

function traverseObjectKeys(results, object, filters) {
	const filterKeys = Object.keys(filters);

	for (const [key, data] of Object.entries(object)) {
		const filterKeyMatches = filterKeys.some(string => string === key);
		
		if (filterKeyMatches) {
			if (!results[key]) {
				results[key] = [];
			}
			
			results[key] = testFilterGroup({
				'key': key,
				'data': data,
				'filter': filters[key]
			});
		} else {
			const dataIsObject = isObject(data);
			const dataIsArrayOfObjects = isArrayOfObjects(data);
	
			if (dataIsObject || dataIsArrayOfObjects) {
				return traverseObjectKeys(results, data, filters);
			}
		}
	}

	return results;
}

export default traverseObjectKeys;