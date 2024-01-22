import itemInArray from '../utilities/item-in-array.js'

/**
 * Test whether an attribute string looks like a number or boolean.
 * @param {string} string - The test string.
 * @returns {boolean}
 */

function isAttributeValueBoolean(string) {
	const values = {
		'number': ['0', '-1'],
		'boolean': ['true', 'false'],
	};
	
	if (itemInArray(values.number, string)) {
		return false;
	}

	if (itemInArray(values.boolean, string)) {
		return true;
	}
}

export default isAttributeValueBoolean;