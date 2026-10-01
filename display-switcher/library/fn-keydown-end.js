import processSelection from './process-selection.js';

function keydownEnd(params) {
	const { event, module } = params;

	if (module.props.keys.selection.includes(event.key) && event.type === 'keydown') {
		processSelection({
			module,
			targetChild: module.state.nodes.focusedChild
		});
	}
}

export default keydownEnd;
