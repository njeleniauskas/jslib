import getFocusValuesByAttribute from '../../common/composite-navigation/get-focus-values-by-attribute.js';
import isElementFocused from '../../common/composite-navigation/is-element-focused.js';
import resolveTargetIndex from './resolve-target-index.js';
import setRovingComponentFocus from './set-roving-component-focus.js';

function resetFocusState(module) {
	const targetIndex = resolveTargetIndex(module);
	const targetChild = module.state.nodes.children[targetIndex];
	const isComponentFocused = isElementFocused(
		module.nodes.component,
		module.props.attributes.componentFocus
	);

	if (module.props.navigationType === 'roving' && isComponentFocused) {
		setRovingComponentFocus(module, 'false');
	}

	const childStates = getFocusValuesByAttribute(module.props.attributes.childFocus);

	module.state.nodes.children.forEach((child) => {
		if (module.props.navigationType === 'roving') {
			if (child === targetChild) {
				child.setAttribute(module.props.attributes.childFocus, childStates.focus);
			} else {
				child.setAttribute(module.props.attributes.childFocus, childStates.blur);
			}
		} else {
			child.setAttribute(module.props.attributes.childFocus, childStates.blur);
		}
	});

	if (module.props.navigationType === 'reference') {
		module.nodes.component.setAttribute(module.props.attributes.activeDescendant, null);
	}
}

export default resetFocusState;
