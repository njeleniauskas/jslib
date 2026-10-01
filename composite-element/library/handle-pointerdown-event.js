import getFocusValuesByAttribute from '../../common/composite-navigation/get-focus-values-by-attribute.js';
import getElementIndexByAttribute from '../../common/composite-navigation/get-element-index-by-attribute.js';
import updateFocusState from './update-focus-state.js';

/**
 * @param {event} event - The pointerdown event.
 * @param {class} module - The class module.
 */

function handlePointerdownEvent(event, module) {
	module.functions.pointerdownStart?.({ event, module });
	module.emitter?.emit(`${module.name}/${module.id}:pointerdown-start`, {
		event
	});

	const childString = `[${module.props.attributes.child}="${module.id}"]`;
	module.state.nodes.pointerEventChild = event.target.closest(childString);

	if (module.state.isInitial) return;
	if (module.state.nodes.pointerEventChild === null) return;
	if (module.state.nodes.children === null) return;

	const clickedChild = module.state.nodes.pointerEventChild;
	const children = module.state.nodes.children;
	const childStates = getFocusValuesByAttribute(childString);

	const index = getElementIndexByAttribute({
		elements: children,
		attribute: module.props.attributes.childFocus,
		value: childStates.focus
	});
	const focusedChild = children[index];

	if (clickedChild !== focusedChild) {
		const newIndex = children.indexOf(clickedChild);

		updateFocusState(newIndex, module);

		module.state.nodes.lastFocusedChild = focusedChild;
		module.state.nodes.focusedChild = clickedChild;

		module.functions.focusStateUpdated?.({ module, eventType: event.type, targetChild: clickedChild });
		module.emitter?.emit(`${module.name}/${module.id}:focus-state-updated`, {
			eventType: event.type,
			targetChild: clickedChild
		});
	}

	module.functions.pointerdownEnd?.({ event, module });
	module.emitter?.emit(`${module.name}/${module.id}:pointerdown-end`, {
		event
	});
}

export default handlePointerdownEvent;
