import getFocusValuesByAttribute from '../../common/composite-navigation/get-focus-values-by-attribute.js';
import isElementFocused from '../../common/composite-navigation/is-element-focused.js';
import setRovingComponentFocus from './set-roving-component-focus.js';

/**
 * @param {number} targetIndex - The index of the target child to focus.
 * @param {class} module - The class module.
 */

function updateFocusState(targetIndex, module) {
	const childAttribute = module.props.attributes.childFocus;
	const childStates = getFocusValuesByAttribute(childAttribute);

	const targetChild = module.state.nodes.children[targetIndex];
	const isComponentFocused = isElementFocused(
		module.nodes.component,
		module.props.attributes.componentFocus
	);

	if (module.props.navigationType === 'roving' && !isComponentFocused) {
		setRovingComponentFocus(module, 'true');
	}

	module.state.nodes.children.forEach((child) => {
		const childIndex = module.state.nodes.children.indexOf(child);

		if (childIndex === targetIndex) {
			child.setAttribute(childAttribute, childStates.focus);

			if (module.props.navigationType === 'roving') {
				child.focus();
			}
		} else {
			child.setAttribute(childAttribute, childStates.blur);
		}
	});

	if (module.props.navigationType === 'reference') {
		const childID = targetChild.getAttribute('id');

		module.nodes.component.setAttribute(module.props.attributes.activeDescendant, childID);

		if (document.activeElement !== module.nodes.component) {
			module.nodes.component.focus();
		}
	}
}

export default updateFocusState;
