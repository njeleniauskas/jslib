import handleClearEvent from './handle-clear-event.js';

/**
 * @param {event} event - The click event outside of the dialog window.
 * @param {object} module - The class module. 
 */

function handleClickOutsideEvent(event, module) {
	const attribute = module.props.strings.window;
	const outsideDialog = (event.target.closest(attribute) === null);
	const isNotControl = (event.target !== module.nodes.control);
	
	if (module.state.opened && outsideDialog && isNotControl) {
		handleClearEvent(module);
	}
}

export default handleClickOutsideEvent;