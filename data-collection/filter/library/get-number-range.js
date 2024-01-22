/**
 * Organize two numbers into a valid min-max range.
 * @param {string} string 
 * @returns array - An array of two numbers: min and max.
 */

function getNumberRange(string) {
	const delimiters = [',', '-', '–'];
	const max = Infinity;

	let result = [];
	let delimiter;

	delimiters.forEach((symbol) => {
		if (string.includes(symbol)) {
			delimiter = symbol;
		}
	});

	if (string.includes(delimiter)) {
		let numbers = string.split(delimiter).map(item => item.trim());

		numbers.forEach((number) => {
			let actualNumber = Number(number);

			if (isNaN(actualNumber)) {
				actualNumber = max;
			}

			result.push(actualNumber);
		});
	} else {
		//guard against returning NaN
		let numbers = string.split(' ');
		result[0] = Number(numbers[0]);
	}

	return result;
}

export default getNumberRange;