import validPropertyValue from '../../../common/utilities/valid-property-value.js';
import validateDependentArguments from '../../../common/utilities/validate-dependent-arguments.js';

function validateConfig(params) {
	const errors = [];

	if (params === undefined || Object.keys(params).length === 0) {
		throw new Error('args is either missing or empty.');
	}

	if (!validPropertyValue(params, 'id')) {
		errors.push(new Error('An ID is required.'));
	}

	if (!('data' in params)) {
		errors.push(new Error('Data arguments missing.'))
	}

	if (!validPropertyValue(params.data, 'resource')) {
		errors.push(new Error('A resource is required.'));
	}

	if (!validPropertyValue(params.data, 'name')) {
		errors.push(new Error('A name is required.'));
	}

	if (!validPropertyValue(params, 'emitter')) {
		errors.push(new Error('An EventEmitter is required.'));
	}

	validateDependentArguments(errors, [
		{
			'key': 'name',
			'type': 'prop',
			'location': params
		},
		{
			'key': 'resource',
			'type': 'prop',
			'location': params
		}
	]);

	if (errors.length > 0) {
		throw new AggregateError(errors, 'Invalid Collection Arguments:');
	}
}

export default validateConfig;
