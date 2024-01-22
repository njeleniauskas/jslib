function animateRouteChange(nodes, string) {
	nodes.forEach((node) => {
		node.classList.add(string);
	});
}

export default animateRouteChange;