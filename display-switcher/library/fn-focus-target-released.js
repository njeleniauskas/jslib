
import processSelection from './process-selection.js';

function focusTargetReleased(params) {
	const { event } = params;

	if (event.type === 'click') {
		processSelection(params);
	}
}

export default focusTargetReleased;
