import getFocusableElement from './get-focusable-element.js';
import updateStep from './update-step.js';

function addEvents(module) {
	module.nodes.flow.addEventListener('click', async (event) => {
		const target = event.target;
		const next = module.state.step.children.next;

		if (next && (target === next || next.contains(target))) {
			if (!('next' in module.state.step.actions)) return;
			if (!module.state.canUpdate) return;

			await module.state.step.actions.next(module.state);

			const targetStep = getNextStep(1, module);

			updateStep(targetStep, module);
			module.emitter?.emit(`flow/${module.id}:next`, targetStep.name);

			const child = getFocusableElement(0, module.state.step.container, module.props.strings.focusable);

			child.focus();
			return;
		}

		const back = module.state.step.children.back;

		if (back && (target === back || back.contains(target))) {
			if (!('back' in module.state.step.actions)) return;
			if (!module.state.canUpdate) return;

			await module.state.step.actions.back(module.state);

			const targetStep = getNextStep(-1, module);

			updateStep(targetStep, module);

			const child = getFocusableElement(-1, module.state.step.container, module.props.strings.focusable);

			child.focus();

			module.emitter?.emit(`flow/${module.id}:back`, targetStep.name);
			return;
		}
	});

	module.emitter?.add(`flow/${module.id}:can-update`, (value) => {
		module.state.canUpdate = value;
	});

	module.emitter?.add(`flow/${module.id}:change-step`, (targetID) => {
		const targetStep = module.steps[targetID];

		updateStep(targetStep, module);
	});

	module.emitter?.add(`flow/${module.id}:reset`, () => {
		module.resetFlow();
	});
}

function getNextStep(step, module) {
	const keys = Object.keys(module.steps);
	const currentIndex = keys.indexOf(module.state.step.name);
	const name = keys[currentIndex + step];

	return module.steps[name];
}

export default addEvents;
