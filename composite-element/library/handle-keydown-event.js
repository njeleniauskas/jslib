import getElementIndexByKey from '../../common/composite-navigation/get-element-index-by-key.js';
import itemInArray from '../../common/utilities/item-in-array.js';
import updateFocusState from './update-focus-state.js';

/**
 * @param {event} event - The keydown event.
 * @param {class} event - The class module.
 */

function handleKeydownEvent(event, module) {
	const mainAxisKeys = module.state.navigationKeys.main.prev.concat(module.state.navigationKeys.main.next);

	// extend to cross-axis movement (eventually)
	if (itemInArray(mainAxisKeys, event.key)) {
		const targetIndex = getElementIndexByKey({
			key: event.key,
			elements: module.state.nodes.children,
			focusedElement: module.state.nodes.focusedChild,
			navigationKeys: module.state.navigationKeys.main
		});
		const currentIndex = module.state.nodes.children.indexOf(module.state.nodes.focusedChild);

		if (targetIndex !== currentIndex) {
			updateFocusState(targetIndex, module);

			module.state.nodes.lastFocusedChild = module.state.nodes.focusedChild;
			module.state.nodes.focusedChild = module.state.nodes.children[targetIndex];

			if (module.emitter !== null) {
				module.emitter.emit(`${module.id}OnKeydown`, {
					targetChild: module.state.nodes.focusedChild,
					previousTargetChild: module.state.nodes.lastFocusedChild,
				});
			}
		}
	}
}

export default handleKeydownEvent;
