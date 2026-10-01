import processSelection from './process-selection.js';
import resetToComponent from './reset-to-component.js';

function handleFocusedChild(module, params) {
	if (module.props.selectable) {
		processSelection(module, params);
	}

	if (module.props.returnFocusToComponent) {
		resetToComponent(module);
	}
}

export default handleFocusedChild;
