import getCustomFunctions from '../../composite-element/utilities/get-custom-functions.js';
import focusTargetReleased from './fn-focus-target-released.js';
import getTargetIndex from './fn-get-target-index.js';

function addFunctions(module, params) {
	const functions = getCustomFunctions(module, params);
	module.functions = { ...module.functions, ...functions };

	module.functions.focusTargetReleased = focusTargetReleased;

	if (!('targetIndex' in module.functions)) {
		module.functions.targetIndex = getTargetIndex;
	}
}

export default addFunctions;
