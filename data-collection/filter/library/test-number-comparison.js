import mathCodeToSymbol from '../../../common/utilities/math-code-to-symbol.js';
import getNumberRange from './get-number-range.js';

/**
 * 
 * @param {string|number} objectDataParam 
 * @param {string} filterData 
 * @param {string} prefix 
 * @returns boolean
 */

function testNumberComparison(objectDataParam, filterData, prefix) {
	let result = false;
	let objectValue;
	let symbol = mathCodeToSymbol(prefix);
	let numbers = getNumberRange(filterData);

	if (!isNaN(objectDataParam)) {
		objectValue = parseFloat(objectDataParam);
	}

	switch(symbol) {
		default:
		case '=': {
			if (objectValue === numbers[0]) { 
				result = true; 
			}
			break;
		}

		case '!=':
		case '≠': {
			if (objectValue !== numbers[0]) {
				result = true;
			}
			break;
		}

		case '<': {
			if (objectValue < numbers[0]) { 
				result = true; 
			}
			break;
		}

		case '≤':
		case '<=': {
			if (objectValue <= numbers[0]) { 
				result = true; 
			}
			break;
		}

		case '>':  {
			if (objectValue > numbers[0]) { 
				result = true; 
			}
			break;
		}

		case '≥':
		case '>=': {
			if (objectValue >= numbers[0]) { 
				result = true; 
			}
			break;
		}

		case 'range': {
			let min = numbers[0];
			let max = numbers[1];

			if (numbers[0] > numbers[1]) {
				min = numbers[1];
				max	= numbers[0];
			}

			if (objectValue >= min && objectValue <= max) { result = true; }
			break;
		}
	}

	return result;
}

export default testNumberComparison;