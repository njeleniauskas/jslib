/**
 * Check whether a string is a valid state attribute.
 * @param {string} string 
 * @returns boolean
 */

function validStateAttribute(string) {
	const attributes = ['checked', 'selected', 'inert', 'disabled', 'hidden'];
	const prefixAttributes = ['aria-', 'data-'];
	const testString = string.toLowerCase().trim();
	const exactMatch = attributes.some(item => item === testString.toLowerCase());
	
	if (exactMatch) {
		return true;
	}

	return (prefixAttributes.some(item => testString.includes(item)));
}

export default validStateAttribute;