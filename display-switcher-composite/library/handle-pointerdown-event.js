import getTargetElementIndexByFocus from '../../common/composite-navigation/get-target-element-index-by-focus.js';
import updateFocusState from './update-focus-state.js';

/**
 * @param {event} event - The pointerdown event.
 * @param {class} module - The class module.
 */

function handlePointerdownEvent(event, module) {
	let targetChild;
	let targetChildIndex;
	let isChildClick;

	//prepare data
	if (module.props.navigationType === 'tabindex') {
		targetChild = event.target.closest(`[${module.props.attributes.child}]`);
		targetChildIndex = module.state.navigation.children.indexOf(targetChild);
		isChildClick = (targetChild !== null);
	}

	if (module.props.navigationType === 'activedescendant') {
		targetChild = event.target.closest(`[${module.props.attributes.child}]`);
		isChildClick = (targetChild !== null);

		if (isChildClick) {
			targetChildIndex = module.state.navigation.children.indexOf(targetChild);
		} else {
			targetChildIndex = getTargetElementIndexByFocus({
				'selection': module.props.selection,
				'array': module.state.navigation.children,
				'selectedAttribute': module.props.attributes.selected,
				'childAttribute': module.props.attributes.child,
			});
		}

		targetChild = module.state.navigation.children[targetChildIndex];
	}

	//update component
	if (module.props.navigationType === 'tabindex' && isChildClick ||
		module.props.navigationType === 'activedescendant' && isChildClick ||
		module.props.navigationType === 'activedescendant' && module.state.isInitial) {
		updateFocusState(targetChildIndex, module);

		if (module.state.isInitial) {
			module.state.navigation.lastFocusedChild = targetChild;
		} else {
			module.state.navigation.lastFocusedChild = module.state.navigation.focusedChild;
		}

		module.state.navigation.focusedChild = targetChild;
		module.state.isInitial = false;
	}
}

export default handlePointerdownEvent;
