import getElementIndexByKey from '../../common/composite-navigation/get-element-index-by-key.js';
import inArray from '../../common/utilities/in-array.js';
import updateFocusState from './update-focus-state.js';

/**
 * @param {event} event - The keydown event.
 * @param {class} event - The class module.
 */

// eventually, handle multi-axis logic and gettargetindex needs changing
function handleKeydownEvent(event, module) {
	const keydownState = {};

	module.functions.keydownStart?.({ event, module, keydownState });
	module.emitter?.emit(`${module.name}/${module.id}:keydown-start`, {
		event
	});

	if (!module.state.allowShiftNavigation) {
		module.state.keydownStartContext = null;
		return;
	}

	let targetIndex = null;
	let currentIndex = null;

	if ('targetIndex' in keydownState) {
		targetIndex = keydownState.targetIndex;
		currentIndex = null;
	} else {
		const indecies = getTargetIndexByKey(event, module);
		targetIndex = indecies.targetIndex;
		currentIndex = indecies.currentIndex;
	}

	if (targetIndex !== currentIndex) {
		updateFocusState(targetIndex, module);

		module.state.nodes.lastFocusedChild = module.state.nodes.focusedChild;
		module.state.nodes.focusedChild = module.state.nodes.children[targetIndex];

		module.functions.focusStateUpdated?.({ module, event, targetChild: module.state.nodes.focusedChild });
		module.emitter?.emit(`${module.name}/${module.id}:focus-state-updated`, {
			event,
			targetChild: module.state.nodes.focusedChild
		});
	}

	module.functions.keydownEnd?.({ event, module });
	module.emitter?.emit(`${module.name}/${module.id}:keydown-end`, {
		event
	});

	module.state.keydownStartContext = null;
}

function getTargetIndexByKey(event, module) {
	const children = module.state.nodes.children;

	if (children === null || children.length === 0) {
		return { targetIndex: null, currentIndex: null };
	}

	let targetIndex = null;
	let currentIndex = null;

	if (inArray(module.state.navigationKeys.main.all, event.key)) {
		targetIndex = getElementIndexByKey({
			key: event.key,
			elements: children,
			focusedElement: module.state.nodes.focusedChild,
			navigationKeys: module.state.navigationKeys.main
		});
		currentIndex = children.indexOf(module.state.nodes.focusedChild);
	}

	if (inArray(module.props.keys.selection, event.key)) {
		currentIndex = children.indexOf(module.state.nodes.focusedChild);
		targetIndex = currentIndex;
	}

	return { targetIndex, currentIndex };
}

export default handleKeydownEvent;
