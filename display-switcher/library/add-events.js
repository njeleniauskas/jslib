import processSelection from './process-selection.js';

function addEvents(module) {
	if (module.emitter) {
		module.emitter.add(`${module.name}/${module.id}:process-selection`, (targetIndex) => {
			if (module.state.nodes.children === null) {
				module.processNavigationContext('initial', {
					contexts: module.nodes.contexts,
					initialContext: module.nodes.initialContext
				});
			}

			const targetChild = module.state.nodes.children[targetIndex];

			processSelection({ module, targetChild });
		});
	}
}

export default addEvents;
