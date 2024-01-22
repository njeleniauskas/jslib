import removeBracketsFromString from '../../common/utilities/remove-brackets-from-string.js'
import collectInteractiveElements from '../../common/focus-trap/collect-interactive-elements.js';
import getFirstAndLastElements from '../../common/focus-trap/get-first-and-last-elements.js';

function initializeDialog(params) {
	const strings = params.props.strings;
	const controlString = removeBracketsFromString(strings.control);

	params.nodes.passer = Array.from(document.querySelectorAll(strings.passer));
	params.nodes.receiver = Array.from(document.querySelectorAll(strings.receiver));
	params.nodes.window = document.querySelector(strings.window);
	params.nodes.control = params.nodes.passer.find((element) => element.hasAttribute(controlString));

	const windowInteractive = (params.nodes.window.hasAttribute('tabindex') 
		&& params.nodes.window.getAttribute('tabindex') === '-1');
	const nodes = collectInteractiveElements(params.nodes.window);

	params.nodes.ix = {...getFirstAndLastElements(nodes)};

	if (windowInteractive) {
		params.state.windowInteractive = true;
	}

	const hasInert = (params.props.strings.hasOwnProperty('inert') && params.props.strings.inert !== '');

	if (hasInert) {
		params.state.gateControl = true;
	}
}

export default initializeDialog;