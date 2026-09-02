import getTargetElementIndexByFocus from '../../common/composite-navigation/get-target-element-index-by-focus.js';
import getFocusValuesByAttribute from '../../common/composite-navigation/get-focus-values-by-attribute.js';

function resetFocusState(module) {
	const targetElementIndex = getTargetElementIndexByFocus({
		'array': module.state.navigation.children,
		'selection': module.props.selection,
		'childAttribute': module.props.attributes.child,
		'selectedAttribute': module.props.attributes.selected
	});
	const targetElement = module.state.navigation.children[targetElementIndex];
	const referenceStates = getFocusValuesByAttribute(module.props.attributes.referenceFocus);
	const childStates = getFocusValuesByAttribute(module.props.attributes.childFocus);

	let referenceHasAttribute = module.data.nodes.reference.hasAttribute(module.props.attributes.referenceFocus);
	let referenceAttributeValue;

	if (referenceHasAttribute) {
		referenceAttributeValue = module.data.nodes.reference.getAttribute(module.props.attributes.referenceFocus);

		if (isNaN(referenceAttributeValue)) {
			module.data.nodes.reference.setAttribute(module.props.attributes.referenceFocus, referenceStates.blur);
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
		module.data.nodes.reference.setAttribute(module.props.attributes.activeDescendant, controlID);
	}
}

export default resetFocusState;
