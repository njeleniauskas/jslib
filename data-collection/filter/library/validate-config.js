import invalidPropertyValue from '../../../common/utilities/invalid-property-value.js';

function validateConfig(params) {
	const errors = [];

	if (params === undefined || Object.keys(params).length === 0) {
		throw new Error('args is either missing or empty.');
	}

	if (invalidPropertyValue(params, 'id')) {
		errors.push(new Error('An ID is required.'));
	}

	if (invalidPropertyValue(params, 'emitter')) {
		errors.push(new Error('An EventEmitter is required.'));
	}

	if (errors.length > 0)  {
		throw new AggregateError(errors, 'Invalid Filter Arguments:');
	}
}

export default validateConfig;