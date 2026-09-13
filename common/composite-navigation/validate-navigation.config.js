import isFocusable from '../utilities/is-focusable.js';

function validateFocusApproach(props) {
	const errors = [];

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

	return errors;
};

function validateNavigationConfig(props) {
	const errors = [];

	if (props.id === undefined) {
		errors.push(new Error('An ID is required.'));
	}

	errors.push(...validateFocusApproach(props));

	if (props.navigationType === 'reference') {
		if (props.attributes.childFocus === 'tabindex') {
			errors.push(new Error(`navigationType: 'reference' and childFocus: 'tabindex' cannot coexist.`));
		}
	}

	if (errors.length > 0) {
		throw new AggregateError(errors, 'Invalid Configuration:');
	}
}

export default validateNavigationConfig;
