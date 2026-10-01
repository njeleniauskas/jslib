import processSelectionMatch from './process-selection-match.js';

function handleInputEvent(event, module, debouncedQuery) {
	const queryString = module.nodes.component.value.toLowerCase().trim();

	if (!isValidQuery(module, queryString)) {
		if (queryString === '') {
			processSelectionMatch(module);
		}

		return;
	}

	module.state.queryString = queryString;
	debouncedQuery(event, module);
}

function isValidQuery(module, string) {
	return string !== module.state.queryString && string !== '';
}

export default handleInputEvent;
