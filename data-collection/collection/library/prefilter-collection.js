/**
 * Filter an array of objects by a collection of top-level object properties.
 * @param {array} array
 * @param {{prop: string, value: string}[]} params
 * @returns array
 */

function prefilterCollection(array, params) {
	const result = array.filter((item) => {
		return params.every(({prop, value}) => item[prop] === value);
	});

	return result;
}

export default prefilterCollection;
