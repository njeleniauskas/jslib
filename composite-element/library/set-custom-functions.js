function setCustomFunctions(params) {
	if (!('functions' in params)) {
		return {};
	}

	const errors = [];
	const callbacks = {};

	for (const [key, callback] of Object.entries(params.functions)) {
		if (typeof callback === 'function') {
			callbacks[key] = callback;
		} else {
			errors.push(new Error(`Custom function [${key}] is not a function.`));
		}
	}

	if (errors.length > 0) {
		throw new AggregateError(errors, 'Invalid Custom function(s):');
	}

	return callbacks;
}

export default setCustomFunctions;
