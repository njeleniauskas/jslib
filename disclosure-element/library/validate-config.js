/**
 * @param {object} params - Arguments passed to the class.
 */
function validateConfig(params) {
	const errors = [];

	if (!('id' in params)) {
		errors.push('params.id is required.');
	}

	if (errors.length > 0) {
		throw new AggregateError(errors, 'Overlay Button:');
	}
}

export default validateConfig;
