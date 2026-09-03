function validateCollectionArgs(params) {
	const errors = [];

	if (params === undefined) {
		return true;
	}

	if (!('type' in params)) {
		throw new Error ('getCollection: A type is required to process the data correctly.');
	}

	if (!('name' in params)) {
		throw new Error ('getCollection: A name must be provided to describe the collection.');
	}

	if (!('resource' in params)) {
		throw new Error ('getCollection: A resource must be provided to fetch data.');
	}

}

export default validateCollectionArgs;
