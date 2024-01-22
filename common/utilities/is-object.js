/**
 * 
 * @param {*} item 
 * @returns boolean
 */

function isObject(item) {
	return (typeof item === 'object' && !Array.isArray(item) && item !== null);
}

export default isObject;