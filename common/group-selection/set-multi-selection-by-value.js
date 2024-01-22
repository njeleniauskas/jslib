/**
 * @param {array} nodes - The array of nodes to operate on.
 * @param {object} params - Arguments passed to the function. 
 * @param {object} params.targetNode - The node that triggered the event.
 * @param {string} params.selectionAttribute - The selection attribute to update.
 * @param {string} params.resetAttribute - The attribute flagging the reset control.
 */

function setMultiSelectionByValue(nodes, params) {
	const isResetNode = params.targetNode.hasAttribute(params.resetAttribute);

	if (!isResetNode) {
		const isPressed = (params.targetNode.getAttribute(params.selectionAttribute) === 'true');
		let state = 'false';

		if (!isPressed) {
			state = 'true';
		}

		params.targetNode.setAttribute(params.selectionAttribute, state);
	} else {
		nodes.forEach((node) => {
			if (!node.hasAttribute(params.resetAttribute)) {
				node.setAttribute(params.selectionAttribute, 'false');
			}
		});
	}
}

export default setMultiSelectionByValue;