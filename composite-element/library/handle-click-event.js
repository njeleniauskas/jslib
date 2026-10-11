/**
 * @param {event} event - The click event.
 * @param {class} module - The class module.
 */

function handleClickEvent(event, module) {
	if (module.state.nodes.pointerEventChild === null) {
		return;
	}

	const attribute = `[${module.props.attributes.child}="${module.id}"]`;

	if (module.state.nodes.pointerEventChild !== event.target.closest(attribute)) {
		return;
	}

	const children = module.state.nodes.children;
	const clonedChildren = children === null ? null : [...children];
	const targetChild = module.state.nodes.pointerEventChild;

	module.functions.focusTargetReleased?.({ module, event, children, targetChild });
	module.emitter?.emit(`${module.name}/${module.id}:focus-target-released`, {
		event,
		children: clonedChildren,
		targetChild
	});

	module.state.nodes.pointerEventChild = null;
	module.state.nodes.pointerEventSiblings = null;
}

export default handleClickEvent;
