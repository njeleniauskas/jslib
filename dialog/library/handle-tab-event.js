function handleTabEvent(event, params) {	
	if (event.shiftKey) {
		if (document.activeElement === params.nodes.ix.first) {
			params.nodes.ix.last.focus();
			event.preventDefault();
		}
	} else {
		if (document.activeElement === params.nodes.ix.last) {
			params.nodes.ix.first.focus();
			event.preventDefault();
		}
	}

	if (params.state.windowInteractive && event.shiftKey) {
		if (document.activeElement === params.nodes.window) {
			params.nodes.ix.last.focus();
			event.preventDefault();
		}
	}
}

export default handleTabEvent;