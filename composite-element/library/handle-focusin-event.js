import resolveTargetIndex from './resolve-target-index.js';
import updateFocusState from './update-focus-state.js';

function handleFocusinEvent(event, module) {
	if (!module.state.isInitial) {
		return;
	}

	module.processNavigationContext('initial', {
		contexts: module.nodes.contexts,
		initialContext: module.nodes.initialContext
	});

	let targetChild = null;

	if (module.state.nodes.children !== null) {
		const targetIndex = resolveTargetIndex(module);

		updateFocusState(targetIndex, module);

		targetChild = module.state.nodes.children[targetIndex];
	}

	module.state.nodes.lastFocusedChild = targetChild;
	module.state.nodes.focusedChild = targetChild;

	module.state.isInitial = false;

	module.functions.focusStateUpdated?.({ module, eventType: event.type, targetChild });
	module.emitter?.emit(`${module.name}/${module.id}:focus-state-updated`, {
		eventType: event.type,
		targetChild
	});
}

export default handleFocusinEvent;
