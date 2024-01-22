import handleClearEvent from './handle-clear-event.js';

function handleClickOutsideEvent(event, params) {
	const attribute = params.props.strings.window;
	const outsideDialog = (event.target.closest(attribute) === null);
	const isNotControl = (event.target !== params.nodes.control);
	
	if (params.state.opened && outsideDialog && isNotControl) {
		handleClearEvent(params);
	}
}

export default handleClickOutsideEvent;