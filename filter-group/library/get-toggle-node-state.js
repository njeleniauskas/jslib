/**
 * 
 * @param {object} params 
 * @param {boolean} params.toggleByValue 
 * @param {object} params.node
 * @param {string} params.attribute
 * @returns boolean
 */

function getToggleNodeState(params) {
	let value = false;

	if (params.toggleByValue) {
		if (params.node.hasAttribute(params.attribute)) {
			value = JSON.parse(params.node.getAttribute(params.attribute));
		}
	} else {
		const nodeType = ['checkbox', 'radio'];

		if (nodeType.some(type => type === params.node.type)) {
			value = params.node.checked;
		} else {
			if (params.node.hasAttribute(params.attribute)) {
				value = true;
			}
		}
	}

	return value;
}

export default getToggleNodeState;