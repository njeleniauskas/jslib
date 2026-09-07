/**
 * Set a new navigation context for a component using composite navigation.
 * @param {string} type - the type of strategy to be used.
 * @param {Object} params - An object containing all parameters.
 * @param {string} params.id - The ID of the component.
 * @param {string} params.parentAttribute - The data- attribute for the child's parent.
 * @param {string} params.childAttribute - The data- attribute for children.
 *
 * Initial args
 * @param {array} contexts - All context nodes for the component.
 * @param {string} attribute - The truthy attribute to check which context should be active.
 *
 * Pointer args
 * @param {node} target - The event target.
 * @param {string} queryString - The query string to get the closest parent context.
 *
 * Key args
 * @param {node} context - The current context node.
 * @param {array} contexts - All context nodes for the component.
 * @param {string} direction - The direction to move to the next context.
 *
 * @returns {Object} - The context and target child.
 */
const resolvers = {
	initial: ({ contexts, attribute }) => {
		if (contexts.length === 1) {
			return contexts[0];
		} else {
			return contexts.find((context) => context.getAttribute(attribute) === 'true');
		}
	},
	pointer: ({ target, queryString }) => {
		return target.closest(queryString);
	},
	key: ({ context, contexts, direction }) => {
		const currentIndex = contexts.indexOf(context);
		const targetIndex = currentIndex + (direction === 'next' ? 1 : -1);
		const isWithinBounds = targetIndex >= 0 && targetIndex < contexts.length;

		return isWithinBounds ? contexts[targetIndex] : context;
	}
}

function getNavigationContext(type, params) {
	const resolver = resolvers[type];

	if (!resolver) throw new Error(`Unknown getNavigationContext type: ${type}`);

	const context = resolver(params);
	const parentSelector = `[${params.parentAttribute}="${params.id}"]`;
	const childSelector = `[${params.childAttribute}="${params.id}"]`;
	const nodes = {};

	let hasParent = context.querySelector(parentSelector);
	let hasChildren = context.querySelector(childSelector);
	let parentNode;
	let children;

	if (hasChildren === null) {
		parentNode = null;
		children = null;
	}

	if (hasChildren !== null) {
		if (hasParent !== null) {
			parentNode = context.querySelector(parentSelector);
		} else {
			parentNode = context;
		}

		children = Array.from(parentNode.querySelectorAll(childSelector));
	}

	nodes.context = context;
	nodes.parent = parentNode;
	nodes.children = children;

	return nodes;
}

export default getNavigationContext;
