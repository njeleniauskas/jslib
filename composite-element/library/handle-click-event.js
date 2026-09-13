/**
 * @param {event} event - The click event.
 * @param {class} module - The class module.
 */

function handleClickEvent(event, module) {
	if (module.state.nodes.pointerEventChild === null) {
		return;
	}

	const children = module.state.nodes.children;
	const targetChild = module.state.nodes.pointerEventChild;

	if (module.emitter !== null) {
		module.emitter.emit(`${module.id}OnClick`, {
			children,
			targetChild
		});
	}

	module.state.nodes.pointerEventChild = null;
}

export default handleClickEvent;
