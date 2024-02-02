import initializeScrollEvents from './initialize-scroll-events.js';

/**
 * @param {object} module  - The class module.
 */

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