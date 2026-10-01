function validateCollectionArgs(params) {
	const errors = [];

	if (params === undefined) {
		return true;
	}

	if (params.resource === null) {
		errors.push(new Error ('A resource must be provided (was null).'));
	}

	if (params.type === null) {
		errors.push(new Error ('A type is required to process data correctly (was null).'));
	}

	if (params.name === null) {
		errors.push(new Error ('A name must be provided to describe the collection (was null).'));
	}

	if (errors.length > 0) {
		throw new AggregateError(errors, 'getCollection() Failed:');
	}
}

export default validateCollectionArgs;
