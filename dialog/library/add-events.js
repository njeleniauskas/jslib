import handleClickEvent from './handle-click-event.js';
import handleClickOutsideEvent from './handle-click-outside-event.js';
import handleKeydownEvents from './handle-keydown-events.js';
import handleTabEvent from './handle-tab-event.js';

function registerEvents(params) {
	const args = {
		props: params.props,
		nodes: params.nodes,
		state: params.state
	};

	params.nodes.passer.forEach((node) => {
		node.addEventListener('click', (event) => {
			handleClickEvent(event, args);
		});
	});

	params.nodes.window.addEventListener('keydown', (event) => {
		if (event.key === 'Tab') {
			handleTabEvent(event, args);
		}
	});

	document.addEventListener('keydown', (event) => {
		handleKeydownEvents(event, args);
	});

	document.addEventListener('click', (event) => {
		handleClickOutsideEvent(event, args);
	});
}

export default registerEvents;