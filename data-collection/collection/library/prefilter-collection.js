/**
 * Filter an array of objects by a top-level object property.
 * @param {array} array 
 * @param {object} params 
 * @param {string} params.prop - The key to filter by.
 * @param {string} params.value  - The truthy value to filter from.
 * @returns array
 */

function prefilterCollection(array, params) {
	const result = array.filter(item => item[params.prop].toLowerCase() === params.value.toLowerCase());

	return result;
}

export default prefilterCollection;