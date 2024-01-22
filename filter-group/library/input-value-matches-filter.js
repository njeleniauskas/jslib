/**
 * Checks if the input node's value matches what's in the component's filter object.
 * @param {object} filter 
 * @param {object} node 
 * @param {string} [attribute] 
 * @returns boolean
 */

function inputValueMatchesFilter(filter, node, attribute = '') {
	const firstKey = Object.keys(filter)[0];
	const filterString = filter[firstKey];
	let inputValue;
	let filterValue;

	if (attribute === '') {
		inputValue = node.value.trim();
	} else {
		inputValue = node.getAttribute(attribute);
	}
	
	if (filterString === null) {
		filterValue = null;
	} else {
		filterValue = filterString[0].split(':')[1].trim();
	}

	if (inputValue === filterValue) {
		return true;
	}
	
	return false;
}

export default inputValueMatchesFilter;