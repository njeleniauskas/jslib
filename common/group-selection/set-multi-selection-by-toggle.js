/**
 * @param {array} nodes - The array of nodes to operate on.
 * @param {object} params - Arguments passed to the function.
 * @param {object} params.targetNode - The node that triggered the event.
 * @param {string} params.selectionAttribute - The selection attribute to update.
 * @param {string} params.resetAttribute - The attribute flagging the reset control. 
 */

function setMultiSelectionByToggle(nodes, params) {
	const nodeType = ['checkbox', 'radio'];
	const isResetNode = params.targetNode.hasAttribute(params.resetAttribute);

	if (!isResetNode) {
		if (params.targetNode.hasAttribute(params.selectionAttribute)) {
			params.targetNode.removeAttribute(params.selectionAttribute);

			if (nodeType.some(type => type === params.targetNode.type)) {
				params.targetNode.checked = false;
			}
		} else {
			params.targetNode.setAttribute(params.selectionAttribute, '');
		}
	} else {
		nodes.forEach((node) => {
			if (!node.hasAttribute(params.resetAttribute)) {
				node.removeAttribute(params.selectionAttribute);
	
				if (nodeType.some(type => type === node.type)) {
					node.checked = false;
				}
			}
		});
	}
}

export default setMultiSelectionByToggle;