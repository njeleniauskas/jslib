import removeBracketsFromString from '../../common/utilities/remove-brackets-from-string.js';

/**
 * @param {object} params 
 * @param {object} params.props 
 * @param {object} params.nodes 
 * @param {object} params.state 
 */

function openDialog(params) {
	const attribute = removeBracketsFromString(params.props.strings.hidden);
	params.state.opened = true;

	//only data-attributes are viable
	document.documentElement.setAttribute('style', 'overflow: hidden');
	params.nodes.window.setAttribute(attribute, 'false');
	params.nodes.window.classList.add(params.props.strings.toggle);
}

export default openDialog; 