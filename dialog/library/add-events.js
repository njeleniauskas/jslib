import handleClickEvent from './handle-click-event.js';
import handleClickOutsideEvent from './handle-click-outside-event.js';
import handleKeydownEvents from './handle-keydown-events.js';
import handleTabEvent from './handle-tab-event.js';

/**
 * @param {object} module - The class module.
 */

function addEvents(module) {
	module.nodes.passer.forEach((node) => {
		node.addEventListener('click', (event) => {
			handleClickEvent(event, module);
		});
	});

	module.nodes.window.addEventListener('keydown', (event) => {
		if (event.key === 'Tab') {
			handleTabEvent(event, module);
		}
	});

	document.addEventListener('keydown', (event) => {
		handleKeydownEvents(event, module);
	});

	document.addEventListener('click', (event) => {
		handleClickOutsideEvent(event, module);
	});
}

export default addEvents;