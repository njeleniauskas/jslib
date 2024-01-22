function validateNavigationConfig(props) {
	const errors = [];

	if (props.id === undefined) {
		errors.push(new Error('An ID is required.'));
	}

	if (props.attributes.component === null) {
		throw 'The "componentNode" attribute is required.';
	}

	if (!props.multiAxis) {
		if (props.attributes.referenceFocus !== null && 
			props.attributes.referenceFocus !== 'tabindex' &&
			props.attributes.childFocus !== null &&
			props.attributes.childFocus !== 'tabindex') {
			errors.push(new Error('A "tabindex" attribute is required on either the container, reference, or children for single-axis navigation.'));
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