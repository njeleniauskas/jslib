/**
 * 
 * @param {object} nodes 
 * @param {object} attributes 
 */

function getNodes(nodes, attributes) {
	const singleNodes = ['toggle', 'comparison'];
	const arrayNodes = ['control'];

	nodes['group'] = document.querySelector(`[${attributes.group}]`);

	singleNodes.forEach((item) => {
		const node = nodes['group'].querySelector(`[${attributes[item]}]`);
		
		if (node !== null) {
			nodes[item] = node;
		}
	});
	
	arrayNodes.forEach((item) => {
		nodes[item] = Array.from(nodes['group'].querySelectorAll(`[${attributes.control}]`));
	});
	
	nodes['control'].forEach((node) => {
		if (node.hasAttribute(attributes.reset)) {
			nodes['reset'] = node;
		}
	})
}

export default getNodes;