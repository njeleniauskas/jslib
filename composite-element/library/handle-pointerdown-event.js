import getFocusValuesByAttribute from '../../common/composite-navigation/get-focus-values-by-attribute.js';
import getElementIndexByAttribute from '../../common/composite-navigation/get-element-index-by-attribute.js';
import updateFocusState from './update-focus-state.js';

/**
 * @param {event} event - The pointerdown event.
 * @param {class} module - The class module.
 */

function handlePointerdownEvent(event, module) {
	if (module.emitter !== null) {
		module.emitter.emit(`${module.name}/${module.id}:pointerdown`, {
			event,
			module
		});
	}

	const queryString = `[${module.props.attributes.child}="${module.id}"]`;
	const clickedChild = event.target.closest(queryString);

	const initialAndRoving = module.state.isInitial && module.props.navigationType === 'roving';
	const initialAndReference = module.state.isInitial && module.props.navigationType === 'reference';

	module.state.nodes.pointerEventChild = clickedChild;

	if (initialAndRoving || initialAndReference) {
		return;
	}

	if (clickedChild === null) {
		return;
	}

	const childStates = getFocusValuesByAttribute(queryString);
	const index = getElementIndexByAttribute({
		elements: module.state.nodes.children,
		attribute: module.props.attributes.childFocus,
		value: childStates.focus
	});
	const currentSelection = module.state.nodes.children[index];

	if (clickedChild !== currentSelection) {
		const newIndex = module.state.nodes.children.indexOf(clickedChild);

		updateFocusState(newIndex, module);

		module.state.nodes.lastFocusedChild = currentSelection;
		module.state.nodes.focusedChild = clickedChild;

		if (module.emitter !== null) {
			module.emitter.emit(`${module.name}/${module.id}:focus-state-updated`, {
				targetChild: clickedChild
			});
		}
	}
}

export default handlePointerdownEvent;
