import processNavigationContext from './process-navigation-context.js';
import resolveTargetIndex from './resolve-target-index.js';
import updateFocusState from './update-focus-state.js';

function handleFocusinEvent(module) {
	if (module.state.isInitial) {
		processNavigationContext(module, 'initial',
			{
				contexts: module.nodes.contexts,
				contextState: module.props.attributes.contextState
			}
		);

		const targetIndex = resolveTargetIndex(module);
		const targetChild = module.state.nodes.children[targetIndex];

		updateFocusState(targetIndex, module);

		module.state.nodes.lastFocusedChild = targetChild;
		module.state.nodes.focusedChild = targetChild;
		module.state.isInitial = false;

		if (module.emitter !== null) {
			module.emitter.emit(`${module.id}OnFocusin`, {
				targetChild,
				targetIndex
			});
		}

		return;
	}
}

export default handleFocusinEvent;
