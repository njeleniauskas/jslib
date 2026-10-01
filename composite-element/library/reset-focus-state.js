import isElementFocused from '../../common/composite-navigation/is-element-focused.js';
import resetChildFocus from './reset-child-focus.js';
import resolveTargetIndex from './resolve-target-index.js';
import setRovingComponentFocus from './set-roving-component-focus.js';

function resetFocusState(module) {
	if (module.state.nodes.children !== null) {
		const targetIndex = resolveTargetIndex(module);
		const targetChild = module.state.nodes.children[targetIndex];

		resetChildFocus({
			component: module.nodes.component,
			children: module.state.nodes.children,
			targetChild: targetChild,
			navigationType: module.props.navigationType,
			attributes: {
				childFocus: module.props.attributes.childFocus,
				activeDescendant: module.props.attributes.activeDescendant,
			},
		});
	}

	const isComponentFocused = isElementFocused(
		module.nodes.component,
		module.props.attributes.componentFocus
	);

	if (module.props.navigationType === 'roving' && isComponentFocused) {
		setRovingComponentFocus(module, 'false');
	}
}

export default resetFocusState;
