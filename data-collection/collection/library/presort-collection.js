/**
 * Sort an array of objects by a top-level object property.
 * @param {array} array 
 * @param {object} params 
 * @param {object} params.prop - The sorting property 
 * @param {object} params.direction - The sort direction, "asc" or "desc".
 * @returns array
 */

function presortCollection(array, params) {
	const prop = params.prop;
	const direction = params.direction;
	const result = array.sort((a, b) => {
		if (a[prop] > b[prop]) { return 1 }
		if (a[prop] < b[prop]) { return -1 }
	});

	if (direction === 'desc') {
		result.reverse();
	}

	return result;
}

export default presortCollection;