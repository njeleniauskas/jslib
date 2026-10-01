import inArray from '../../common/utilities/in-array.js';
import handleClearEvent from './handle-clear-event.js';

/**
 * @param {event} event - The keydown event for clearing the dialog.
 * @param {object} module - The class module.
 */

function handleKeydownEvents(event, module) {
	if (module.state.opened && inArray(module.props.keys.clear, event.key)) {
		handleClearEvent(module);
	}
}

export default handleKeydownEvents;
