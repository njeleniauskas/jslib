import invalidPropertyValue from '../../common/utilities/invalid-property-value.js';
import validateDependentArguments from '../../common/utilities/validate-dependent-arguments.js';
import validStateAttribute from '../../common/utilities/valid-state-attribute.js';

/**
 * 
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

	
	if (invalidPropertyValue(params, 'type')) {
		errors.push(new Error('args.type is required.'));
	} else {
		if (!['binary', 'input'].some(type => type === params.type)) {
			errors.push(new Error('args.type must be "binary" or "input".'));
		}
	}


	if (invalidPropertyValue(params, 'attributes')) {
		errors.push(new Error('args.attributes are missing.'));
	}

	if (invalidPropertyValue(params.attributes, 'control')) {
		errors.push(new Error('attributes.control is required.'));
	}


	if (params.type === 'binary' ||
		!invalidPropertyValue(params.attributes, 'toggle') ||
		!invalidPropertyValue(params.attributes, 'reset')) {
		if (invalidPropertyValue(params, 'indicators')) {
			errors.push(new Error('args.indicators is missing.'));
		}	
	}


	if (invalidPropertyValue(params, 'emitter')) {
		errors.push(new Error('args.emitter is required.'));
	}


	if (params.type === 'binary') {
		if (!invalidPropertyValue(params, 'indicators')) {
			if (invalidPropertyValue(params.indicators, 'selected')) {
				errors.push(new Error('indicators.selected is required.'));
			}
		}	

		if (invalidPropertyValue(params, 'selectionByValue')) {
			errors.push(new Error('selectionByValue is required.'));
		}

		validateDependentArguments(errors, [
			{
				'key': 'reset',
				'type': 'attributes',
				'location': params.attributes,
			},
			{
				'key': 'reset',
				'type': 'indicators',
				'location': params.indicators,
			},
			{
				'key': 'resetType',
				'type': 'prop',
				'location': params,
			},
		]);
	} else {
		if (invalidPropertyValue(params.attributes, 'method')) {
			errors.push(new Error('attributes.method is required for type=input.'));
		}
	}


	if (!invalidPropertyValue(params.attributes, 'toggle')) {
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