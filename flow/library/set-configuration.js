function setConfiguration(module, params) {
	if (!('id' in params)) {
		throw new Error('An ID is required.');
	}

	module.id = params.id;

	const strings = 'strings' in params ? params.strings : {};

	module.props.strings.flow = 'flow' in strings ?
		strings.flow : `[data-flow="${module.id}"]`;
	module.props.strings.step = 'step' in strings ?
		strings.step : `data-flow-step`;
	module.props.strings.focusable = 'focusable' in strings ?
		strings.focusable : `[data-focus-target]`;
	module.props.strings.hidden = 'hidden' in strings ?
		strings.hidden : `data-hidden`;

	module.steps = 'steps' in params ? params.steps : {};

	const length = Object.entries(module.steps).length;

	if (length <= 1) {
		throw new Error(`A flow must have at least 2 steps. ${length} given.`);
	}

	module.emitter = 'emitter' in params ? params.emitter : null;
}

export default setConfiguration;
