/**
 * 
 * @param {object} node - The target element.
 * @param {string} attribute - The selection attribute.
 * @param {boolean} istrue - The boolean value to flag the direction.
 */

function setAttributeByToggle(node, attribute, isTrue) {
	if (isTrue) {
		node.setAttribute(attribute, '');
	} else {
		node.removeAttribute(attribute);
	}
}

export default setAttributeByToggle;