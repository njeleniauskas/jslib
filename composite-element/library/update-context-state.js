function updateContextState(nodes, contextState) {
	if (nodes.lastContext !== null && nodes.lastContext !== nodes.context) {
		nodes.lastContext.setAttribute(contextState, 'false');
	}

	nodes.context.setAttribute(contextState, 'true');
}

export default updateContextState;
