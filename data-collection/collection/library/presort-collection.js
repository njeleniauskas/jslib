/**
 * Sort an array of objects by a top-level object property.
 * @param {array} array 
 * @param {object} params 
 * @param {object} params.prop - The sorting property (string, or number)
 * @param {object} params.direction - The sort direction, "asc" or "desc".
 * @returns array
 */

function presortCollection(array, params) {
	const prop = params.prop;
	const direction = params.direction;
	const result = array.sort((a, b) => {
		let aType = typeof(a[prop]);
		let bType = typeof(b[prop]);

		if (aType === bType) {
			if (a[prop] > b[prop]) { return 1 }
			if (a[prop] < b[prop]) { return -1 }
		} else {
			const isEmpty = val => val === null || val === undefined || val === '';
	
			if (isEmpty(a[prop]) && isEmpty(b[prop])) { return 0 }
			if (isEmpty(a[prop]) && !isEmpty(b[prop])) { return 1 }
			if (!isEmpty(a[prop]) && isEmpty(b[prop])) { return -1 }
		}
	});

	if (direction === 'desc') {
		result.reverse();
	}

	return result;
}

export default presortCollection;