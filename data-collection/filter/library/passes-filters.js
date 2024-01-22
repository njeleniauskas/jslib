import itemInArray from '../../../common/utilities/item-in-array.js';

/**
 * 
 * @param {object} testObject - The key/array of boolean values from the initial test function.
 * @param {array} groupedFilters - The object of key/arrays for each set of filter groups.
 * @returns boolean
 */

function passesFilters(testObject, groupedFilters) {
	const processedKeys = [];
	const testGroups = [];
	const results = [];

	for (const [key, array] of Object.entries(testObject)) {
		const group = [];

		if (!(key in groupedFilters)) {
			group.push(...array);

			if (!processedKeys.includes(key)) {
				processedKeys.push(key);
			}
		} else {
			groupedFilters[key].forEach((item) => {
				if (!processedKeys.includes(item)) {
					processedKeys.push(item);
					group.push(...testObject[item]);
				}
			});
		}

		if (group.length > 0) {
			testGroups.push(group);
		}
	}

	testGroups.forEach((array) => {
		results.push(itemInArray(array, true));
	});

	return results.every(item => item === true);
}

export default passesFilters;