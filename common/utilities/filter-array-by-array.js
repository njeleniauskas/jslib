/**
 * 
 * @param {array} array1 
 * @param {array} array2 
 * @param {string} method - A string for including or excluding the 2nd array.
 * @returns array
 */

function filterArrayByArray(array1, array2, method = 'include') {
	if (method === 'include') {
		return array1.filter((item) => array2.includes(item));
	} else {
		return array1.filter((item) => !array2.includes(item));
	}
}

export default filterArrayByArray;