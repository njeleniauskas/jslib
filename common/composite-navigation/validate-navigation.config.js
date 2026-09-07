import isFocusable from '../utilities/is-focusable.js';

function validateNavigationConfig(props) {
	const errors = [];

	if (props.id === undefined) {
		errors.push(new Error('An ID is required.'));
	}

	if (!props.multiAxis) {
		const componentString = `[${props.attributes.component}="${props.id}"]`;
		const componentNode = document.querySelector(componentString);
		const childString = `[${props.attributes.child}="${props.id}"]`;
		const childNode = document.querySelector(childString);
		const componentIsFocusable = isFocusable(componentNode);
		const childIsFocusable = isFocusable(childNode);

		if (childIsFocusable && componentIsFocusable) {
			errors.push(new Error('Both the component and control nodes are focusable.'));
		}

		if (!childIsFocusable && !componentIsFocusable) {
			errors.push(new Error('Neither the component or control nodes are focusable.'));
		}
	}

	if (props.attributes.activeDescendant !== null &&
		props.attributes.activeDescendant.startsWith('aria-') &&
		props.attributes.childFocus === 'tabindex') {
		errors.push (new Error('Invalid Config Passed: Children with "tabindex" cannot coexist with a component that has the "aria-activedescendant" attribute.'));
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
