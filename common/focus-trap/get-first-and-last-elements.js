function getFirstAndLastElements(array) {
	const last = array.length - 1;

	return {
		first: array[0],
		last: array[last],
	}
}

export default getFirstAndLastElements;