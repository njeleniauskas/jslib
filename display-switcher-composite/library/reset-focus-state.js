import props from '../data/props.js';
import data from '../data/data.js';
import state from '../data/state.js';

import getTargetElementIndexByFocus from '../../common/composite-navigation/get-target-element-index-by-focus.js';
import getFocusValuesByAttribute from '../../common/composite-navigation/get-focus-values-by-attribute.js';

function resetFocusState() {
	const targetElementIndex = getTargetElementIndexByFocus({
		'array': state.navigation.children,
		'selection': props.selection,
		'childAttribute': props.attributes.child,
		'selectedAttribute': props.attributes.selected
	});
	const targetElement = state.navigation.children[targetElementIndex];
	const referenceStates = getFocusValuesByAttribute(props.attributes.referenceFocus);
	const childStates = getFocusValuesByAttribute(props.attributes.childFocus);

	let referenceHasAttribute = data.nodes.reference.hasAttribute(props.attributes.referenceFocus);
	let referenceAttributeValue;

	if (referenceHasAttribute) {
		referenceAttributeValue = data.nodes.reference.getAttribute(props.attributes.referenceFocus);

		if (isNaN(referenceAttributeValue)) {
			data.nodes.reference.setAttribute(props.attributes.referenceFocus, referenceStates.blur);
		}
	}

	state.navigation.children.forEach((child) => {
		if (child === targetElement) {
			if (props.navigationType === 'tabindex') {
				child.setAttribute(props.attributes.childFocus, childStates.focus);
			} else {
				child.setAttribute(props.attributes.childFocus, childStates.blur);
			}
		} else {
			child.setAttribute(props.attributes.childFocus, childStates.blur);
		}
	});

	if (props.attributes.activeDescendant !== null) {
		data.nodes.reference.setAttribute(props.attributes.activeDescendant, '');
	}
}

export default resetFocusState;