import validateDependentArguments from '../../common/utilities/validate-dependent-arguments.js';

/**
 * @param {object} params - Arguments passed to the class.
 */

function validateConfig(params) {
	const errors = [];

	if (!('strings' in params)) {
		errors.push(new Error('params.strings is required.'));
	}

	if (!('themes' in params)) {
		errors.push(new Error('params.themes is required.'))
	}

	validateDependentArguments(errors, [
		{
			'key': 'controlState',
			'type': 'strings',
			'location': params.strings,
		},
		{
			'key': 'multiState',
			'type': 'strings',
			'location': params.strings,
		}
	]);


	if (errors.length > 0) {
		throw new AggregateError(errors, 'Overlay Button:');
	}
}

export default validateConfig;
