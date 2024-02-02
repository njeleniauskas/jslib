import props from '../data/props.js';
import data from '../data/data.js';
import state from '../data/state.js';

import getFocusValuesByAttribute from '../../common/composite-navigation/get-focus-values-by-attribute.js';
import isFocusAttributePresentAndTrue from '../../common/composite-navigation/is-focus-attribute-present-and-true.js';

/**
 * @param {number} targetIndex - The index of the target child to focus.
 */

function updateFocusState(targetIndex) {
	const targetChild = state.navigation.children[targetIndex];
	const targetChildValue = targetChild.getAttribute(props.attributes.childFocus);

	const referenceState = getFocusValuesByAttribute(props.attributes.referenceFocus);
	const childState = getFocusValuesByAttribute(props.attributes.childFocus);
	const referenceAttribute = props.attributes.referenceFocus;
	const childAttribute = props.attributes.childFocus;
	const isReferenceFocused = isFocusAttributePresentAndTrue({
		'attribute': referenceAttribute,
		'node': data.nodes.reference
	});
	
	if (isReferenceFocused === false) {
		data.nodes.reference.setAttribute(referenceAttribute, referenceState.focus);
	}

	if (targetChildValue !== childState.focus) {
		state.navigation.children.forEach((child) => {
			let childIndex = state.navigation.children.indexOf(child);
			
			if (childIndex === targetIndex) {
				child.setAttribute(childAttribute, childState.focus);

				if (props.navigationType === 'tabindex') {
					child.focus();
				}
			} else {
				child.setAttribute(childAttribute, childState.blur);
			}
		})
	}

	if (props.attributes.activeDescendant !== null) {
		let childID = targetChild.getAttribute('id');

		data.nodes.reference.setAttribute(props.attributes.activeDescendant, childID);
	}
}

export default updateFocusState;