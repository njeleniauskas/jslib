import handleControlPassingEvent from './handle-control-passing-event.js';

/**
 * @param {event} event - The click event.
 * @param {object} module - The class module.
 */

function handleClickEvent(event, module) {
	const hasClass = module.nodes.control.classList.contains(module.props.strings.inert);

	if (!module.state.gateControl || module.state.gateControl && !hasClass) {
		handleControlPassingEvent(event.target, module);
	}
}

export default handleClickEvent;