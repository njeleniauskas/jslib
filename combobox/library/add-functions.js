import getCustomFunctions from '../../composite-element/utilities/get-custom-functions.js';
import createDataQuery from './create-data-query.js';
import handleKeydownStart from './fn-handle-keydown-start.js';
import handlePointerdownStart from './fn-handle-pointerdown-start.js';
import handlefocusTargetReleased from './fn-handle-focus-target-released.js';
import handleQueryFunctionEnd from './fn-handle-query-function-end.js';
import handleReset from './fn-handle-reset.js';
import handleFocusStateUpdated from './fn-handle-focus-state-updated.js';
import handleQuery from './fn-handle-query.js';

function addFunctions(module, params) {
	const configFunctions = {
		query: createDataQuery
	};

	const functions = getCustomFunctions(module, params, configFunctions);

	module.functions.keydownStart = handleKeydownStart;
	module.functions.pointerdownStart = handlePointerdownStart;
	module.functions.focusStateUpdated = handleFocusStateUpdated;
	module.functions.focusTargetReleased = handlefocusTargetReleased;
	module.functions.queryFunctionEnd = handleQueryFunctionEnd;
	module.functions.reset = handleReset;

	module.functions = { ...module.functions, ...functions };

	if (typeof module.functions.query !== 'function') {
		module.functions.query = handleQuery;
	}
}

export default addFunctions;
