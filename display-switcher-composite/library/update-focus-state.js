import getFocusValuesByAttribute from '../../common/composite-navigation/get-focus-values-by-attribute.js';
import isFocusAttributePresentAndTrue from '../../common/composite-navigation/is-focus-attribute-present-and-true.js';

/**
 * @param {number} targetIndex - The index of the target child to focus.
 * @param {class} module - The class module.
 */

function updateFocusState(targetIndex, module) {
	const targetChild = module.state.navigation.children[targetIndex];
	const targetChildValue = targetChild.getAttribute(module.props.attributes.childFocus);

	const referenceState = getFocusValuesByAttribute(module.props.attributes.referenceFocus);
	const childState = getFocusValuesByAttribute(module.props.attributes.childFocus);
	const referenceAttribute = module.props.attributes.referenceFocus;
	const childAttribute = module.props.attributes.childFocus;


	//this will never return true on activedescendant…
	const isReferenceFocused = isFocusAttributePresentAndTrue({
		'attribute': referenceAttribute,
		'node': module.data.nodes.reference
	});

	if (isReferenceFocused === false) {
		module.data.nodes.reference.setAttribute(referenceAttribute, referenceState.focus);
	}

	if (targetChildValue !== childState.focus) {
		module.state.navigation.children.forEach((child) => {
			let childIndex = module.state.navigation.children.indexOf(child);

			if (childIndex === targetIndex) {
				child.setAttribute(childAttribute, childState.focus);

				if (module.props.navigationType === 'tabindex') {
					child.focus();
				}
			} else {
				child.setAttribute(childAttribute, childState.blur);
			}
		})
	}

	if (module.props.attributes.activeDescendant !== null) {
		const id = 'id';
		const childID = targetChild.getAttribute(id);

		module.data.nodes.reference.setAttribute(module.props.attributes.activeDescendant, childID);
	}
}

export default updateFocusState;
