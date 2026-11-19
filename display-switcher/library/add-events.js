import processSelection from './process-selection.js';
import addNodes from './add-nodes.js';
import updateSingleSelection from '../../common/group-selection/update-single-selection.js';
import updateViewState from './update-view-state.js';

function addEvents(module) {
	module.emitter?.add(`${module.name}/${module.id}:get-views`, () => {
		addNodes(module);
	});

	module.emitter?.add(`${module.name}/${module.id}:process-selection`, (targetIndex) => {
		if (module.state.nodes.children === null) {
			module.processNavigationContext('initial', {
				contexts: module.nodes.contexts,
				initialContext: module.nodes.initialContext
			});
		}

		const targetChild = module.state.nodes.children[targetIndex];

		processSelection({ module, targetChild });
	});

	module.emitter?.add(`${module.name}/${module.id}:update-controls`, (targetID) => {
		module.nodes.contexts.forEach((context) => {
			const children = [...context.querySelectorAll(`[${module.props.attributes.child}="${module.id}"]`)];

			const targetChild = children.find((child) => child.getAttribute(module.props.attributes.controlID) === targetID);

			updateSingleSelection(children, {
				'targetNode': targetChild,
				'selectionAttribute': module.props.attributes.selected,
				'selectionByValue': true,
			});
		});
	});

	module.emitter?.add(`${module.name}/${module.id}:update-views`, (targetID) => {
		updateViewState(module, targetID);
	});
}

export default addEvents;
