import processComboboxState from './process-combobox-state.js';

function handleQueryFunctionEnd(event, module) {
	processComboboxState(event, module);
}

export default handleQueryFunctionEnd;
