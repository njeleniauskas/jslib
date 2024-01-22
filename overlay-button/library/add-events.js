import initializeScrollEvents from './initialize-scroll-events.js';

async function addEvents(module) {
	try {
		switch (module.props.config) {
			case 'scroll':
				initializeScrollEvents(module);
				break;
		}
	} catch (error) {
		console.error(error);
	}
}

export default addEvents;