/**
 * Checks if the component's filter object keys are not arrays.
 * @param {object} filter 
 * @returns boolean
 */

function filterStateEmpty(filter) {
	const results = [];
	for (const [key, value] of Object.entries(filter)) {
		results.push(Array.isArray(value));
	}

	return results.every(group => group === false);
}

export default filterStateEmpty;