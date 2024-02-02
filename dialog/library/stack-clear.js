/**
 * @param {object} params
 * @param {object} params.stack - The object storing data on opened windows.
 */

function clearStack(params) {
	params.stack.pop();
}

export default clearStack;