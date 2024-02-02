import removeBracketsFromString from '../../common/utilities/remove-brackets-from-string.js'
import collectInteractiveElements from '../../common/focus-trap/collect-interactive-elements.js';
import getFirstAndLastElements from '../../common/focus-trap/get-first-and-last-elements.js';

/**
 * @param {object} module - The class module.
 */

function initializeDialog(module) {
	const strings = module.props.strings;
	const controlString = removeBracketsFromString(strings.control);

	module.nodes.passer = Array.from(document.querySelectorAll(strings.passer));
	module.nodes.receiver = Array.from(document.querySelectorAll(strings.receiver));
	module.nodes.window = document.querySelector(strings.window);
	module.nodes.control = module.nodes.passer.find((element) => element.hasAttribute(controlString));

	const windowInteractive = (module.nodes.window.hasAttribute('tabindex') 
		&& module.nodes.window.getAttribute('tabindex') === '-1');
	const nodes = collectInteractiveElements(module.nodes.window);

	module.nodes.ix = {...getFirstAndLastElements(nodes)};

	if (windowInteractive) {
		module.state.windowInteractive = true;
	}

	const hasInert = (module.props.strings.hasOwnProperty('inert') && module.props.strings.inert !== '');

	if (hasInert) {
		module.state.gateControl = true;
	}
}

export default initializeDialog;