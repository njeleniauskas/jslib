import getTargetElementIndexByFocus from '../../common/composite-navigation/get-target-element-index-by-focus.js';
import getFocusValuesByAttribute from '../../common/composite-navigation/get-focus-values-by-attribute.js';

function resetFocusState(module) {
	const targetElementIndex = getTargetElementIndexByFocus({
		'selection': module.props.selection,
		'array': module.state.navigation.children,
		'childAttribute': module.props.attributes.child,
		'selectedAttribute': module.props.attributes.selected
	});
	const targetElement = module.state.navigation.children[targetElementIndex];
	const componentStates = getFocusValuesByAttribute(module.props.attributes.componentFocus);
	const childStates = getFocusValuesByAttribute(module.props.attributes.childFocus);

	let componentHasAttribute = module.data.nodes.component.hasAttribute(module.props.attributes.componentFocus);
	let componentAttributeValue;

	if (componentHasAttribute) {
		componentAttributeValue = module.data.nodes.component.getAttribute(module.props.attributes.componentFocus);

		if (isNaN(componentAttributeValue)) {
			module.data.nodes.component.setAttribute(module.props.attributes.componentFocus, componentStates.blur);

			if (module.data.nodes.component !== module.state.navigation.context) {
				module.state.navigation.context.setAttribute('data-focused', 'false');
			}
		}
	}

	module.state.navigation.children.forEach((child) => {
		if (child === targetElement) {
			if (module.props.navigationType === 'tabindex') {
				child.setAttribute(module.props.attributes.childFocus, childStates.focus);
			} else {
				child.setAttribute(module.props.attributes.childFocus, childStates.blur);
			}
		} else {
			child.setAttribute(module.props.attributes.childFocus, childStates.blur);
		}
	});

	if (module.props.attributes.activeDescendant !== null) {
		const id = 'id';
		const controlID = targetElement.getAttribute(id);
		module.data.nodes.component.setAttribute(module.props.attributes.activeDescendant, controlID);
	}
}

export default resetFocusState;
