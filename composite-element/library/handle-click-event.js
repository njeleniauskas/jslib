/**
 * @param {event} event - The click event.
 * @param {class} module - The class module.
 */

function handleClickEvent(event, module) {
	if (module.state.nodes.pointerEventChild === null) {
		return;
	}

	if (module.state.nodes.pointerEventChild !== event.target) {
		return;
	}

	const children = module.state.nodes.children ?? [];
	const targetChild = module.state.nodes.pointerEventChild;

	module.functions.focusTargetReleased?.({ module, eventType: event.type, children, targetChild });
	module.emitter?.emit(`${module.name}/${module.id}:focus-target-released`, {
		eventType: event.type,
		children: [...children],
		targetChild
	});

	module.state.nodes.pointerEventChild = null;
	module.state.nodes.pointerEventSiblings = null;
}

export default handleClickEvent;
