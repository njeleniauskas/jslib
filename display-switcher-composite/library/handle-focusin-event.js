import getTargetElementIndexByFocus from '../../common/composite-navigation/get-target-element-index-by-focus.js';
import getFocusValuesByAttribute from '../../common/composite-navigation/get-focus-values-by-attribute.js';
import updateFocusState from './update-focus-state.js';

function handleFocusinEvent(module) {
	if (module.state.isKeyEvent) {
		let targetChildIndex;
		let targetChild;
		let referenceStates;

		if (module.state.isInitial === false) {
			if (module.props.attributes.referenceFocus !== 'tabindex') {
				module.data.nodes.reference.setAttribute(module.props.attributes.referenceFocus, 'true');
			}

			if (module.props.attributes.childFocus !== 'tabindex') {
				module.state.navigation.focusedChild.setAttribute(module.props.attributes.childFocus, 'true');
			}
		}

		if (module.state.isInitial) {
			targetChildIndex = getTargetElementIndexByFocus({
				'selection': module.props.selection,
				'array': module.state.navigation.children,
				'selectedAttribute': module.props.attributes.selected,
				'childAttribute': module.props.attributes.child,
			});

			targetChild = module.state.navigation.children[targetChildIndex];

			//side-effect: adds tabindex to an element without the attribute.
			if (module.props.attributes.referenceFocus !== 'tabindex') {
				referenceStates = getFocusValuesByAttribute(module.props.attributes.referenceFocus);
				module.data.nodes.reference.setAttribute(module.props.attributes.referenceFocus, referenceStates.focus);
			}

			if (module.props.attributes.child !== 'tabindex') {
				updateFocusState(targetChildIndex, module);
			}

			module.state.navigation.lastFocusedChild = targetChild;
			module.state.navigation.focusedChild = targetChild;
			module.state.isInitial = false;
		}
	}
}

export default handleFocusinEvent;
