import isFocusable from '../utilities/is-focusable.js';

function validateNavigationConfig(props) {
	const errors = [];

	if (props.id === undefined) {
		errors.push(new Error('An ID is required.'));
	}

	if (props.attributes.component === null) {
		errors.push(new Error('The "componentNode" attribute is required.'));
	}

	if (!props.multiAxis) {
		const referenceString = `[${props.attributes.reference}="${props.id}"]`;
		const referenceNode = document.querySelector(referenceString);
		const childString = `[${props.attributes.child}="${props.id}"]`;
		const childNode = document.querySelector(childString);
		const referenceIsFocusable = isFocusable(referenceNode);
		const childIsFocusable = isFocusable(childNode);

		if (childIsFocusable && referenceIsFocusable) {
			errors.push(new Error('Both the reference and control nodes are focusable.'));
		}

		if (!childIsFocusable && !referenceIsFocusable) {
			errors.push(new Error('Neither the reference or control nodes are focusable.'));
		}
	}

	if (props.attributes.activeDescendant !== null &&
		props.attributes.activeDescendant.startsWith('aria-') &&
		props.attributes.childFocus === 'tabindex') {
		errors.push (new Error('Invalid Config Passed: Children with "tabindex" cannot coexist with a reference that has the "aria-activedescendant" attribute.'));
	}

	if (props.attributes.activeDescendant !== null &&
		props.attributes.activeDescendant.startsWith('data-') &&
		props.attributes.childFocus !== null &&
		props.attributes.childFocus !== 'tabindex') {
		errors.push(new Error('Using reference navigation with "data-activedescendant" is not an accessible technique. Use "aria-activedescendant" instead.'));
	}

	if (errors.length > 0) {
		throw new AggregateError(errors, 'Invalid Configuration Passed:');
	}
}

export default validateNavigationConfig;
