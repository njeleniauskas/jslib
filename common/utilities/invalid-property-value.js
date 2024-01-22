/**
 * Check an object property for a valid value.
 * @param {object} object 
 * @param {string} key 
 * @returns boolean
 */

function invalidPropertyValue(object, key) {
	if (object !== undefined) {
		const keyMissing = !(key in object);
		const valueInvalid = (object[key] === null || object[key] === undefined ||object[key] === '');
	
		if (keyMissing || !keyMissing && valueInvalid) {
			return true;
		}
		return false;
	}

	throw new Error('Cannot check validity (object is undefined).');
}

export default invalidPropertyValue;