import handlePasserTriggerEvent from './handle-passer-trigger-event.js';

function handleClickEvent(event, params) {
	const hasClass = params.nodes.control.classList.contains(params.props.strings.inert);

	if (!params.state.gateControl || params.state.gateControl && !hasClass) {
		handlePasserTriggerEvent(event.target, params);
	}
}

export default handleClickEvent;