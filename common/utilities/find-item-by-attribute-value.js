/**
 * 
 * @param {array} array 
 * @param {string} attribute 
 * @param {string} value 
 * @returns any
 */

function findItemByAttributeValue(array, attribute, value) {
	return array.find((item) => item.getAttribute(attribute) === value);
}

export default findItemByAttributeValue;