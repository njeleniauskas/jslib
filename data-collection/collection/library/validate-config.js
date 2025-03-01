import invalidPropertyValue from '../../../common/utilities/invalid-property-value.js';
import validateDependentArguments from '../../../common/utilities/validate-dependent-arguments.js';

function validateConfig(params) {
	const errors = [];

	if (params === undefined || Object.keys(params).length === 0) {
		throw new Error('args is either missing or empty.');
	}

	if (invalidPropertyValue(params, 'id')) {
		errors.push(new Error('An ID is required.'));
	}

	if (invalidPropertyValue(params, 'filepath')) {
		errors.push(new Error('A filepath is required.'));
	}

	if (invalidPropertyValue(params, 'name')) {
		errors.push(new Error('A name is required.'));
	}

	if (invalidPropertyValue(params, 'emitter')) {
		errors.push(new Error('An EventEmitter is required.'));
	}


	validateDependentArguments(errors, [
		{
			'key': 'name',
			'type': 'prop',
			'location': params
		},
		{
			'key': 'filepath',
			'type': 'prop',
			'location': params
		}
	]);

	if (errors.length > 0) {
		throw new AggregateError(errors, 'Invalid Collection Arguments:');
	}
}

export default validateConfig;