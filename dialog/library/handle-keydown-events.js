import itemInArray from '../../common/utilities/item-in-array.js';
import handleClearEvent from './handle-clear-event.js';

/**
 * @param {event} event - The keydown event for clearing the dialog.
 * @param {object} module - The class module.
 */

function handleKeydownEvents(event, module) {
	if (module.state.opened && itemInArray(module.props.keys.clear, event.key)) {
		handleClearEvent(module);
	}
}

export default handleKeydownEvents;