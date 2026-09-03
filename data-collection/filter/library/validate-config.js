import validPropertyValue from '../../../common/utilities/valid-property-value.js';

function validateConfig(params) {
	const errors = [];

	if (params === undefined || Object.keys(params).length === 0) {
		throw new Error('args is either missing or empty.');
	}

	if (!validPropertyValue(params, 'id')) {
		errors.push(new Error('An ID is required.'));
	}

	if (!validPropertyValue(params, 'emitter')) {
		errors.push(new Error('An EventEmitter is required.'));
	}

	if (errors.length > 0)  {
		throw new AggregateError(errors, 'Invalid Filter Arguments:');
	}
}

export default validateConfig;
