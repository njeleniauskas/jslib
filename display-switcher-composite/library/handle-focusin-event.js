import getTargetElementIndexByFocus from '../../common/composite-navigation/get-target-element-index-by-focus.js';
import getFocusValuesByAttribute from '../../common/composite-navigation/get-focus-values-by-attribute.js';
import updateFocusState from './update-focus-state.js';

function handleFocusinEvent(module) {
	if (module.state.isKeyEvent) {
		let targetChildIndex;
		let targetChild;
		let componentStates;

		if (module.state.isInitial) {
			targetChildIndex = getTargetElementIndexByFocus({
				'selection': module.props.selection,
				'array': module.state.navigation.children,
				'selectedAttribute': module.props.attributes.selected,
				'childAttribute': module.props.attributes.child,
			});

			targetChild = module.state.navigation.children[targetChildIndex];

			//side-effect: adds tabindex to an element without the attribute.
			if (module.props.attributes.componentFocus !== 'tabindex') {
				componentStates = getFocusValuesByAttribute(module.props.attributes.componentFocus);
				module.data.nodes.component.setAttribute(module.props.attributes.componentFocus, componentStates.focus);

				if (module.data.nodes.component !== module.state.navigation.context) {
					module.state.navigation.context.setAttribute('data-focused', 'true');
				}
			}

			if (module.props.attributes.child !== 'tabindex') {
				updateFocusState(targetChildIndex, module);
			}

			module.state.navigation.lastFocusedChild = targetChild;
			module.state.navigation.focusedChild = targetChild;
			module.state.isInitial = false;
		}

		if (!module.state.isInitial) {
			if (module.props.attributes.componentFocus !== 'tabindex') {
				module.data.nodes.component.setAttribute(module.props.attributes.componentFocus, 'true');

				if (module.data.nodes.component !== module.state.navigation.context) {
					module.state.navigation.context.setAttribute('data-focused', 'true');
				}
			}

			if (module.props.attributes.childFocus !== 'tabindex') {
				module.state.navigation.focusedChild.setAttribute(module.props.attributes.childFocus, 'true');
			}
		}
	}
}

export default handleFocusinEvent;
