/**
 * Check whether the elements being used for this component are valid.
 * @param {Object} params - An object containing the component nodes.
 * @param {array} params.contexts - The context nodes from the DOM.
 */

function validateDomNodes(params) {
	const validElements = new Set(['DIV', 'TABLE']);
	const errors = [];

	params.contexts.forEach((context) => {
		if (!validElements.has(context.nodeName)) {
			errors.push(new Error(`A <div> or <table> must be used as the context element (<table> for interactive tables/grids only). Please change [${context.nodeName}] to match.`));
		}
	});


	if (errors.length > 0) {
		throw new AggregateError(errors, 'Invalid DOM Elements:');
	}
}

export default validateDomNodes;
