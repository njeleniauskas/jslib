/**
 * @param {event} event - The tab key event.
 * @param {object} module - The class module.
 */

function handleTabEvent(event, module) {	
	if (event.shiftKey) {
		if (document.activeElement === module.nodes.ix.first) {
			module.nodes.ix.last.focus();
			event.preventDefault();
		}
	} else {
		if (document.activeElement === module.nodes.ix.last) {
			module.nodes.ix.first.focus();
			event.preventDefault();
		}
	}

	if (module.state.windowInteractive && event.shiftKey) {
		if (document.activeElement === module.nodes.window) {
			module.nodes.ix.last.focus();
			event.preventDefault();
		}
	}
}

export default handleTabEvent;