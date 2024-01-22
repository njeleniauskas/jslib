/**
 * 
 * @param {string} string 
 * @returns string
 */

function removeBracketsFromString(string) {
	return string.replace(/\[|\]/g, '');
}

export default removeBracketsFromString;