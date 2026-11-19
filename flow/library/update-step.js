function updateStep(targetStep, module) {
	module.state.step = targetStep;

	module.nodes.steps.forEach((step) => {
		const name = step.getAttribute(module.props.strings.step);

		if (name === module.state.step.name) {
			step.setAttribute(module.props.strings.hidden, 'false');
		} else {
			step.setAttribute(module.props.strings.hidden, 'true');
		}
	});
}

export default updateStep;
