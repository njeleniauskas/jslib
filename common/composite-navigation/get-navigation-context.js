import getLanguageAndNavigationContext from './get-language-and-navigation-context.js';

/**
 * Set a new navigation context for a component using composite navigation.
 * @param {string} type - the type of strategy to be used.
 * @param {Object} params - An object containing all parameters needed.
 *
 * Initial args
 * @param {array} contexts - All context nodes for the component.
 * @param {string} contextState - The attribute to check which context should be active.
 *
 * Pointer args
 * @param {node} target - The event target.
 * @param {string} queryString - The query string to get the closest parent context.
 *
 * Key args
 * @param {node} context - The current context node.
 * @param {array} contexts - All context nodes for the component.
 * @param {string} step - The steps to the desired context.
 *
 * @returns {Object} - The context and target child.
 */

const resolvers = {
	initial: ({ contexts, initialContext }) => {
		if (initialContext !== null) {
			return initialContext;
		} else {
			return contexts[0];
		}
	},
	attribute: ({ contexts, attribute, value }) => {
		return contexts.find((context) => context.getAttribute(attribute) === value);
	},
	pointer: ({ node, queryString }) => {
		return node.closest(queryString);
	},
	key: ({ args }) => {
		// change by step size (what args needed)
	},
}

function getNavigationContext(module, type, params) {
	const resolver = resolvers[type];

	if (!resolver) throw new Error(`Unknown getNavigationContext type: ${type}`);

	const context = resolver(params);
	const parentSelector = `[${module.props.attributes.parent}="${module.id}"]`;
	const childSelector = `[${module.props.attributes.child}="${module.id}"]`;

	let hasChildren = context.querySelector(childSelector) !== null;
	let parentNode = context.querySelector(parentSelector);
	let children;

	if (!hasChildren) {
		parentNode = null;
		children = null;
	}

	if (hasChildren) {
		if (parentNode === null) {
			parentNode = context;
		}

		children = Array.from(parentNode.querySelectorAll(childSelector));
	}

	const contextData = getLanguageAndNavigationContext({
		node: context,
		orientation: module.props.attributes.orientation
	});

	return {
		nodes: {
			context: context,
			parent: parentNode,
			children: children
		},
		...contextData
	};
}

export default getNavigationContext;
