/**
 * Check whether the elements being used for this component are valid.
 * @param {Object} params
 * @param {array} params.contexts - The context nodes from the DOM.
 * @param {array} params.component - The component node from the DOM.
 */


function validatePersistentNodes(params) {
	const validContextElements = new Set(['DIV', 'TABLE']);
	const validComponentElements = new Set(['INPUT', 'DIV']);
	const errors = [];

	params.contexts.forEach((context) => {
		if (context === params.component) {
			return;
		}

		if (!validContextElements.has(context.nodeName)) {
			errors.push(new Error(`A <div> or <table> must be used as the context element (<table> for interactive tables/grids only). Please change [${context.nodeName}] to match.`));
		}
	});

	if (!validComponentElements.has(component.nodeName)) {
		errors.push(new Error(`An <input> or <div> must be used as the component element. Please change [${component.nodeName}] to match.`));
	}


	if (errors.length > 0) {
		throw new AggregateError(errors, 'Invalid DOM Elements:');
	}
}

export default validatePersistentNodes;
