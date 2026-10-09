import validPropertyValue from '../../../common/utilities/valid-property-value.js';

/**
 *
 * @param {object} params - The configuration arguments passed to the presenter class.
 * @param {string} params.id - The ID value string to identify this collection of elements.
 * @param {object} params.attributes -
 * @param {string} params.attributes.container - The container element for the live collection.
 * @param {string} params.attributes.collection - The collection element containing items.
 * @param {string} params.attributes.liveRegion - The live-region element for assistive messaging.
 * @param {object} params.templates - The rendering template(s) for collection and items.
 * @param {object} params.emitter - The event emitter communicating reactive events.
 */

function validateConfig(params) {
	const errors = [];

	if (params === undefined || Object.keys(params).length === 0) {
		throw new Error('args is either missing or empty.');
	}


	if (!validPropertyValue(params, 'id')) {
		errors.push(new Error('ID is required.'));
	}


	if (!validPropertyValue(params, 'attributes')) {
		errors.push(new Error('Attributes are missing.'));
	}

	if (validPropertyValue(params, 'attributes')) {
		if (!validPropertyValue(params.attributes, 'container')) {
			errors.push(new Error('The attribute for the container is missing.'));
		}

		if (!validPropertyValue(params.attributes, 'collection')) {
			errors.push(new Error('The attribute for the collection is missing.'));
		}

		if (!validPropertyValue(params.attributes, 'message')) {
			errors.push(new Error('The attribute for the message is missing.'));
		}

		if (!validPropertyValue(params.attributes, 'liveRegion')) {
			errors.push(new Error('The attribute for the live region is missing.'));
		}
	}


	if (!validPropertyValue(params, 'templates')) {
		errors.push(new Error('Templates argument is missing. At least one template must be passed to the presenter.'));
	}


	if (!validPropertyValue(params, 'emitter')) {
		errors.push(new Error('An EventEmitter is required.'));
	}


	if (errors.length > 0) {
		throw new AggregateError(errors, 'Invalid Presenter Arguments:');
	}
}

export default validateConfig;
