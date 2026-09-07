import getFocusValuesByAttribute from '../../common/composite-navigation/get-focus-values-by-attribute.js';
import isFocusAttributePresentAndTrue from '../../common/composite-navigation/is-focus-attribute-present-and-true.js';

/**
 * @param {number} targetIndex - The index of the target child to focus.
 * @param {class} module - The class module.
 */

function updateFocusState(targetIndex, module) {
	const targetChild = module.state.navigation.children[targetIndex];
	const targetChildValue = targetChild.getAttribute(module.props.attributes.childFocus);

	const componentState = getFocusValuesByAttribute(module.props.attributes.componentFocus);
	const childState = getFocusValuesByAttribute(module.props.attributes.childFocus);
	const componentAttribute = module.props.attributes.componentFocus;
	const childAttribute = module.props.attributes.childFocus;


	//this will never return true on activedescendant…
	const isComponentFocused = isFocusAttributePresentAndTrue({
		'attribute': componentAttribute,
		'node': module.data.nodes.component
	});

	if (isComponentFocused === false) {
		module.data.nodes.component.setAttribute(componentAttribute, componentState.focus);

		if (module.data.nodes.component !== module.state.navigation.context) {
			module.state.navigation.context.setAttribute('data-focused', 'true');
		}
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

		module.data.nodes.component.setAttribute(module.props.attributes.activeDescendant, childID);
	}
}

export default updateFocusState;
