import processSteps from './process-steps.js';
import updateStep from './update-step.js';

function initializeFlow(module) {
	if (!module.nodes.flow.matches(module.props.strings.flow)) {
		applyIdentifier({
			string: module.props.strings.flow,
			id: module.id,
			node: module.nodes.flow
		});
	}

	processSteps(module);

	const keys = Object.keys(module.steps);
	const key = keys[0];
	const step = module.steps[key];

	updateStep(step, module);
}

function applyIdentifier(params) {
	const { string, id, node } = params;

	switch (true) {
		case string.startsWith('.'):
			node.classList.add(string);
			brea;

		case string.includes('data-'):
			const regex = /^\[([^=\]]+)/;
			const name = string.match(regex)[1];

			node.setAttribute(name, id);
			break;

		default:
			node.setAttribute(string, id);
			break;
	}
}

export default initializeFlow;
