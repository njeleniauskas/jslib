import validateDependentArguments from '../../common/utilities/validate-dependent-arguments.js';

function validateConfig(params) {
	const errors = [];

	if (params.config !== 'scroll') {
		throw new Error('This component only supports the \'scroll\' configuration (at present).')
	}

	if (!('control' in params.strings)) {
		throw new Error('strings.control is required.');
	}

	validateDependentArguments(errors, [
		{
			'key': 'control',
			'type': 'strings',
			'location': params.strings,
		},
		{
			'key': 'visibility',
			'type': 'strings',
			'location': params.strings,
		},
		{
			'key': 'hidden',
			'type': 'strings',
			'location': params.strings,
		}
	]);

	if (errors.length > 0) {
		throw new AggregateError(errors, 'Overlay Button:');
	}
}

export default validateConfig;