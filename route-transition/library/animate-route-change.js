/**
 * @param {object} nodes - DOM elements that react to route changes.
 * @param {string} string - The class to add to DOM elements.
 */

function animateRouteChange(nodes, string) {
	nodes.forEach((node) => {
		node.classList.add(string);
	});
}

export default animateRouteChange;