import itemInArray from '../../common/utilities/item-in-array.js';

/**
 * @param {event} event - The keyup event.
 * @param {class} module - The class module.
 */

function handleKeyupEvent(event, module) {
	if (!itemInArray(module.props.keys.selection, event.key)) {
		return;
	}

	const children = module.state.nodes.children;
	const targetChild = module.state.nodes.focusedChild;

	if (module.emitter !== null) {
		module.emitter.emit(`${module.name}/${module.id}:focus-target-clicked`, {
			children,
			targetChild
		});
	}
}

export default handleKeyupEvent;
