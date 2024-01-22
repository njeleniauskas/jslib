import data from '../data/data.js';

function setReferenceNodes(nodes) {
	const keys = Object.keys(nodes);

	keys.forEach((key) => {
		data.nodes[key] = nodes[key];
	});
}

export default setReferenceNodes;