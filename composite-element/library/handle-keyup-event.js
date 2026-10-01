import inArray from '../../common/utilities/in-array.js';

/**
 * @param {event} event - The keyup event.
 * @param {class} module - The class module.
 */

function handleKeyupEvent(event, module) {
	if (!inArray(module.props.keys.selection, event.key)) {
		return;
	}

	const children = module.state.nodes.children ?? [];
	const targetChild = module.state.nodes.focusedChild;

	module.functions.focusTargetReleased?.({ module, eventType: event.type, children, targetChild });
	module.emitter?.emit(`${module.name}/${module.id}:focus-target-released`, {
		eventType: event.type,
		children: [...children],
		targetChild
	});
}

export default handleKeyupEvent;
