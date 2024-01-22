import testData from './test-data.js';

/**
 * Test a the values of a filter group against a specific object property.
 * @param {object} params 
 * @param {string} params.key - The object key being evaluated.
 * @param {object} params.data - The object data being evaluated.
 * @param {array} params.filter - The filter group being tested
 * @returns Array of Boolean values.
 */

function testFilterGroup(params) {
	const isObject = (typeof params.data === 'object');
	let results = [];

	if (!isObject) {
		results = testData({
			'key': params.key,
			'data': params.data,
			'filter': params.filter
		});
	}

	if (isObject && Array.isArray(params.data) && typeof params.data[0] !== 'object') {
		params.data.forEach((item) => {
			const result = testData({
				'key': params.key,
				'data': item,
				'filter': params.filter
			});

			results = results.concat(result);
		});
	}
	
	return results;
}

export default testFilterGroup;