import traverseObjectKeys from './traverse-object-keys.js';

/**
 * 
 * @param {object} object 
 * @param {function} filters 
 * @returns object
 */

function deepObjectFilter(object, filters) {
	const results = {};

	traverseObjectKeys(results, object, filters);

	return results;
}

export default deepObjectFilter;