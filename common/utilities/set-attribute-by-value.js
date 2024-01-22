/**
 * 
 * @param {object} node - The target element.
 * @param {string} attribute - The selection attribute.
 * @param {boolean} value - The selection attribute value (boolean).
 */

function setAttributeByValue(node, attribute, value) {
	node.setAttribute(attribute, value.toString());
}

export default setAttributeByValue;