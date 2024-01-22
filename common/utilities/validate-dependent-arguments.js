/**
 * Check arguments that have other arguments as dependencies (e.g. {j} requires {k} to work).
 * @param {array} errors - An array of errors to push to an AggregateError.
 * @param {array} array - The array of objects to test. Objects include key, type, and location properties.
 */

function validateDependentArguments(errors, array) {
	const includedArgs = [];
	const missingArgs = [];
	let inclusion = '';
	let message;

	array.forEach((object) => {
		let arg = `${object.type}.${object.key}`;

		if (object.location !== undefined) {			
			if (object.key in object.location) {
				includedArgs.push(arg);
			} else {
				missingArgs.push(arg);
			}
		} else {
			errors.push(new Error(`Cannot check dependent ${object.key} argument (object location is undefined).`));
		}
	});

	if (includedArgs.length > 0) {
		inclusion = ' when including ';
	}

	message = `${missingArgs.toString()} required${inclusion}${includedArgs.toString()}.`;
	message = message.replaceAll(',', ', ');

	if (missingArgs.length > 0 && includedArgs.length > 0) {
		errors.push(new Error(message));
	}
}

export default validateDependentArguments;