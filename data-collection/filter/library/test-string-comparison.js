/**
 * 
 * @param {string} objectData 
 * @param {string} filterData 
 * @param {string} prefix 
 * @returns Boolean
 */

function testStringComparison(objectData, filterData, prefix) {
	const testObjectData = objectData.toLowerCase().trim();
	const testFilterData = filterData.toLowerCase();
	let result = false;

	if (prefix === 'includes') {
		if (testFilterData.includes(',')) {
			let values = testFilterData.split(',').filter(Boolean);

			values.forEach((value) => {
				let formattedString = value.trim();

				if (value.trim().length !== 0 && testObjectData.includes(formattedString)) {
					result = true;
				}
			});
		} else {
			if (testObjectData.includes(testFilterData)) {
				result = true;
			}
		}
	} else {
		//currently a fallback to catch erroneous prefixes
		result = (testObjectData === testFilterData);
	}

	return result;
}

export default testStringComparison;