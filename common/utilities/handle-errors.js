function handleErrors(errors) {
	if (errors instanceof AggregateError) {
		console.error(errors.message)

		for (const error of errors.errors) {
			console.error(error.message);
		}
	} else {
		console.error(errors);
	}
}

export default handleErrors;
