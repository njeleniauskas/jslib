/**
 * Organize focus and blur values for the target attribute.
 * @param {string} attribute - The attribute to test agains.
 * @returns {Object}
 */

function getFocusValuesByAttribute(attribute) {
	const values = {};

	if (attribute === 'tabindex') {
		values.focus = '0';
		values.blur = '-1'
	} else {
		values.focus = 'true';
		values.blur = 'false';
	}

	return values;
}

export default getFocusValuesByAttribute;