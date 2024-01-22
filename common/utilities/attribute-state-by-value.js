/**
 * Checks whether the attribute for selection is a data- or aria- attribute.
 * @param {string} attribute 
 * @returns binary
 */

function attributeStateByValue(attribute) {
	const binaries = ['data-', 'aria-'];

	return binaries.some(item => attribute.includes(item));
}

export default attributeStateByValue;