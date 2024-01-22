/**
 * 
 * @param {object} object 
 * @param {string} [keyName] - The key name to add to the object.
 * @returns array
 */

function convertObjectToArray(object, keyName = null) {
	const array = [];

	for (const [key, value] of Object.entries(object)) {
		if (keyName !== null) {
			value[keyName] = key;
		}

		array.push(value);
	}

	return array;
}

export default convertObjectToArray;