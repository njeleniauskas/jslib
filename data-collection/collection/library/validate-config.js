import validateDependentArguments from '../../../common/utilities/validate-dependent-arguments.js';

function validateConfig(params) {
	const errors = [];

	if (params === undefined || Object.keys(params).length === 0) {
		throw new Error('args is either missing or empty.');
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