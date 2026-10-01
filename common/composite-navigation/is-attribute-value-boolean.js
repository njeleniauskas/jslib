import inArray from '../utilities/in-array.js'

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

	if (inArray(values.number, string)) {
		return false;
	}

	if (inArray(values.boolean, string)) {
		return true;
	}
}

export default isAttributeValueBoolean;
