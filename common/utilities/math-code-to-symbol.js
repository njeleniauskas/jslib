/**
 * Convert a math code/entity to it's corresponding programming equivalent.
 * @param {string} character 
 * @returns string
 */

function mathCodeToSymbol(character) {
	const map = {
		'&ne': '!=',
		'&#8800': '!=',
		'&#61': '=',
		'&equals': '=',
		'&lt': '<',
		'&#60': '<',
		'&le': '<=',
		'&#8804': '<=',
		'&gt': '>',
		'&#62': '>',
		'&ge': '>=',
		'&#8804': '>=',
	};
	const testChar = character.replace(';', '').toLowerCase();

	if (testChar in map) {
		return map[testChar];
	}

	return character.replace(';', '').toLowerCase();
}

export default mathCodeToSymbol;