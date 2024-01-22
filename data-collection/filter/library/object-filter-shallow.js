import testFilterGroup from './test-filter-group.js';

/**
 * 
 * @param {object} object 
 * @param {object} filters 
 * @returns object
 */

function shallowObjectFilter(object, filters) {
	const filterKeys = Object.keys(filters);
	const results = {};

	filterKeys.forEach((filterKey) => {
		if (object[filterKey] !== undefined) {
			results[filterKey] = testFilterGroup({
				'key': filterKey,
				'data': object[filterKey],
				'filter': filters[filterKey]
			});
		}
	});

	return results;
}

export default shallowObjectFilter;