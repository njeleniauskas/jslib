/**
 * Set a new navigation context for a component using composite navigation.
 * @param {Object} params - An object containing all parameters.
 * @param {array} params.contexts - The array of contexts that exist.
 * @param {string} params.id - The ID of the component.
 * @param {string} params.parentAttribute - The data- attribute for the child's parent.
 * @param {string} params.childAttribute - The data- attribute for children.
 * @param {boolean} params.initializing - A flag to tell the function to set the initial context, or a context during operation.
 * @returns {Object} - The context and target child.
 */

function getNavigationContext(params) {
	const contexts = params.contexts;
	const numContexts = contexts.length;
	const parentSelector = `[${params.parentAttribute}="${params.id}"]`;
	const childSelector = `[${params.childAttribute}="${params.id}"]`;
	const nodes = {};

	if (params.initializing && numContexts === 1) {
		let hasParent = contexts[0].querySelector(parentSelector);
		let hasChildren = contexts[0].querySelector(childSelector);
		let parentNode;
		let children;

		if (hasChildren === null) {
			parentNode = null;
			children = null;
		}

		if (hasChildren !== null) {
			if (hasParent !== null) {
				parentNode = contexts[0].querySelector(parentSelector);
			} else {
				parentNode = contexts[0];
			}

			children = Array.from(parentNode.querySelectorAll(childSelector));
		}
		
		nodes.context = contexts[0];
		nodes.parent = parentNode;
		nodes.children = children;
	}

	return nodes;
}

export default getNavigationContext;