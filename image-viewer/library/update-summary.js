function updateSummary(module) {
	const current = module.state.currentIndex + 1;
	const total = module.data.lastIndex + 1;
	const message = `${current} of ${total}`;

	module.nodes.summary.textContent = message;
}

export default updateSummary;
