function getCustomFunctions(module, params, configFunctions = null) {
	if (!('functions' in params)) {
		return {};
	}

	const errors = [];
	const functions = {};

	for (const [key, data] of Object.entries(params.functions)) {
		if (typeof data === 'function') {
			functions[key] = data;
		} else {
			const isValidObject = data && typeof data === 'object' && typeof data.callback === 'function';

			if (configFunctions[key] && isValidObject) {
				functions[key] = configFunctions[key](module, data);
			} else {
				errors.push(new Error(`Custom function [${key}] does not have a valid function to assign.`));
			}
		}
	}

	if (errors.length > 0) {
		throw new AggregateError(errors, 'Invalid Custom function(s):');
	}

	return functions;
}

export default getCustomFunctions;
