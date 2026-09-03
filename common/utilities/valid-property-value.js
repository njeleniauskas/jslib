/**
 * Check an object property for a valid value.
 * @param {object} object
 * @param {string} key
 * @param {boolean} [allowEmptyString=false]
 * @returns boolean
 */

function validPropertyValue(object, key, allowEmptyString = false) {
	if (object === undefined) {
		throw new Error('Cannot check prop validity (object is undefined).');
	}

	const keyExists = key in object;
	const value = object[key];
	const stringComparison = allowEmptyString ? true : value !== '';
	const isValid = value !== null && value !== undefined && stringComparison;

	if (keyExists && isValid) {
		return true;
	}

	return false;
}

export default validPropertyValue;
