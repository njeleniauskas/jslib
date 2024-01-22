import testObjectKeys from './test-object-keys.js';
import shallowObjectFilter from './object-filter-shallow.js';
import deepObjectFilter from './object-filter-deep.js';
import passesFilters from './passes-filters.js';

/**
 * 
 * @param {object} params 
 * @param {array} params.referenceData
 * @param {object} params.filters
 * @param {array} params.groupedKeys
 * @param {boolean} params.deepFilter
 * @returns array
 */

function filterCollection(params) {
	const array = [];
	let filterFunction = shallowObjectFilter;

	if (params.deepFilter) {
		filterFunction = deepObjectFilter;
	}

	params.referenceData.forEach((object) => {
		const results = testObjectKeys(object, filterFunction, params.filters);
		const isValid = passesFilters(results, params.groupedKeys);

		if (isValid) {
			array.push(object);
		}
	});

	return array;
}

export default filterCollection;