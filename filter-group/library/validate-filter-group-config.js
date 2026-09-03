import validPropertyValue from '../../common/utilities/valid-property-value.js';
import validateDependentArguments from '../../common/utilities/validate-dependent-arguments.js';
import validStateAttribute from '../../common/utilities/valid-state-attribute.js';

/**
 * @param {object} params
 * @param {object} params.attributes
 * @param {string} params.attributes.group
 * @param {string} params.attributes.control
 * @param {string} params.type
 * @param {object} params.emitter
 */

function validateFilterGroupConfig(params) {
	const errors = [];

	if (params === undefined || Object.keys(params).length === 0) {
		throw new Error('args is either missing or empty.');
	}


	if (!validPropertyValue(params, 'type')) {
		errors.push(new Error('args.type is required.'));
	} else {
		if (!['binary', 'input'].some(type => type === params.type)) {
			errors.push(new Error('args.type must be "binary" or "input".'));
		}
	}


	if (!validPropertyValue(params, 'attributes')) {
		errors.push(new Error('args.attributes are missing.'));
	}

	if (!validPropertyValue(params.attributes, 'control')) {
		errors.push(new Error('attributes.control is required.'));
	}


	if (params.type === 'binary' ||
		validPropertyValue(params.attributes, 'toggle') ||
		validPropertyValue(params.attributes, 'reset')) {
		if (!validPropertyValue(params, 'indicators')) {
			errors.push(new Error('args.indicators is missing.'));
		}
	}


	if (!validPropertyValue(params, 'emitter')) {
		errors.push(new Error('args.emitter is required.'));
	}


	if (params.type === 'binary') {
		if (validPropertyValue(params, 'indicators')) {
			if (!validPropertyValue(params.indicators, 'selected')) {
				errors.push(new Error('indicators.selected is required.'));
			}
		}

		validateDependentArguments(errors, [
			{
				'key': 'reset',
				'type': 'attributes',
				'location': params.attributes,
			},
			{
				'key': 'resetVisible',
				'type': 'indicators',
				'location': params.indicators,
			},
			{
				'key': 'resetHidden',
				'type': 'indicators',
				'location': params.indicators,
			}
		]);
	} else {
		if (!validPropertyValue(params.attributes, 'method')) {
			errors.push(new Error('attributes.method is required for type=input.'));
		}
	}


	if (validPropertyValue(params.attributes, 'toggle')) {
		if (!validStateAttribute(params.indicators.toggle)) {
			errors.push(new Error('indicators.toggle not a valid state attribute.'));
		}

		validateDependentArguments(errors, [
			{
				'key': 'toggle',
				'type': 'attributes',
				'location': params.attributes,
			},
			{
				'key': 'toggle',
				'type': 'indicators',
				'location': params.indicators,
			},
		]);
	}


	if (errors.length > 0 ) {
		throw new AggregateError(errors, 'Filter Group:');
	}
}

export default validateFilterGroupConfig;
