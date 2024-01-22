/**
 * Check whether a number is within a specific range.
 * @param {array} range - A two-index array that defines the range of numbers that are valid.
 * @param {number} value - The value to test.
 * @returns {boolean}
 */

function numberWithinRange(range, value) {
	let result = false;
	let rangeSorted = sortNumberArray(range);

	if (isNaN(value)) {
		return result;
	}

	if (value >= rangeSorted[0] && value <= rangeSorted[1]) {
		result = true;
	}

	return result;
}

function sortNumberArray(array) {
	let result = [];

	array.forEach((number) => {
		result.push(Number(number));
	});

	result.sort((a, b) => {
		return a - b;
	});

	return result;
}

export default numberWithinRange;