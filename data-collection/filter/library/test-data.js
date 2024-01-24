import mathCodeToSymbol from '../../../common/utilities/math-code-to-symbol.js';
import testNumberComparison from './test-number-comparison.js';
import testStringComparison from './test-string-comparison.js';

/**
 * Test individual object property values against a specific filter.
 * @param {object} params
 * @param {string} params.key - The current filter key being tested
 * @param {string|number} params.data - The data being evaluated.
 * @param {array} params.filter - The array of items to test against the data.
 * @returns Array of Boolean values.
 */

function testData(params) {
	const hasPrefix = (params.filter.length >= 1 && params.filter[0].includes(':'));
	const results = [];
	let prefixFunction;
	let objectData;
	let filterData;
	let result;

	if (!hasPrefix) {
		objectData = typeof params.data === 'number' ? params.data : params.data.toLowerCase().trim();

		
		params.filter.forEach((item) => {
			filterData = item;

			//special check for binary-single-selection
			if (filterData === 'any') {
				result = true;
			} else {
				result = (objectData === filterData);
			}

			results.push(result);
		});
	}

	//if it has a prefix, it's already focused on testing someting spe
	if (hasPrefix) {
		const strings = params.filter[0].split(':').map(item => item.trim());
		const stringComparisons = ['includes'];
		let prefix;

		objectData = params.data;
		filterData = strings[1];

		if (stringComparisons.some(comparison => comparison === strings[0])) {
			prefix = strings[0];
			prefixFunction = testStringComparison;
			objectData = params.data;
		} else {
			prefix = mathCodeToSymbol(strings[0]);
			prefixFunction = testNumberComparison;
		}

		result = prefixFunction(objectData, filterData, prefix);
		results.push(result);
	}

	return results;
}

export default testData;