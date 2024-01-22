import itemInArray from '../../common/utilities/item-in-array.js';

import handleClearEvent from './handle-clear-event.js';

function handleKeydownEvents(event, params) {
	if (params.state.opened && itemInArray(params.props.keys.clear, event.key)) {
		handleClearEvent(params);
	}
}

export default handleKeydownEvents;