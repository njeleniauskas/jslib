/**
 * Find an element within an array by a specific attribute and value.
 * @param {array} array - The array to loop through.
 * @param {Object} keyValuePair - The computed property name, and the target value; e.g. {[name]: value}
 * @returns {Object|null} - The element that matched the condition, or null.
 */

function getElementFromArrayByKeyValuePair(array, keyValuePair) {
	let result = null;
	let key = Object.keys(keyValuePair)[0];
	let value = keyValuePair[key];

	array.forEach((element) => {
		if (element.getAttribute(key) === value) {
			result = element;
		}
	});

	return result;
}

export default getElementFromArrayByKeyValuePair;