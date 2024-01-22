/**
 * Check for an array of objects, e.g. [{}, {}].
 * @param {*} item 
 * @returns boolean
 */

function isArrayOfObjects(item) {
	const firstItemIsObject = (typeof item[0] === 'object' && !Array.isArray(item[0]) && item[0] !== null);

	return (Array.isArray(item) && firstItemIsObject);
}

export default isArrayOfObjects;