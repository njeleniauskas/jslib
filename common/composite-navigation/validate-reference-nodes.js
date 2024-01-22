import itemInArray from '../utilities/item-in-array.js';

/**
 * Check whether the elements being used for this component are valid.
 * @param {Object} params - An object containing the reference nodes.
 * @param {Object} params.component - The component node from the DOM.
 */

function validateReferenceNodes(params) {
	const validElements = ['DIV', 'TABLE'];
	const errors = [];

	if (!itemInArray(validElements, params.component.nodeName)) {
		errors.push(new Error('A <div> or <table> must be used as the component element (<table> for interactive tables/grids only). Please change your html to match.'));
	}

	if (errors.length > 0) {
		throw new AggregateError(errors, 'Invalid DOM Elements:');
	}
}

export default validateReferenceNodes;