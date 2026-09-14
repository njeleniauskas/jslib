import resolveTargetIndex from './resolve-target-index.js';
import updateFocusState from './update-focus-state.js';

function handleFocusinEvent(module) {
	if (module.state.isInitial) {
		module.processNavigationContext('initial');

		console.log(module.state.nodes)

		const targetIndex = resolveTargetIndex(module);
		const targetChild = module.state.nodes.children[targetIndex];

		updateFocusState(targetIndex, module);

		module.state.nodes.lastFocusedChild = targetChild;
		module.state.nodes.focusedChild = targetChild;
		module.state.isInitial = false;

		if (module.emitter !== null) {
			module.emitter.emit(`${module.name}/${module.id}:focus-state-updated`, {
				targetChild
			});
		}

		return;
	}
}

export default handleFocusinEvent;
