import removeBracketsFromString from '../../common/utilities/remove-brackets-from-string.js';

/**
 * @param {object} params 
 * @param {object} params.props
 * @param {object} params.nodes
 * @param {object} params.state
 */

function closeDialog(params) {
	const attribute = removeBracketsFromString(params.props.strings.hidden);
	params.state.opened = false;

	document.documentElement.removeAttribute('style');
	params.nodes.window.classList.remove(params.props.strings.toggle);
	
	if (params.state.gateControl) {
		params.nodes.control.classList.add(params.props.strings.inert);
	}
	
	setTimeout(() => {
		//only data-attributes are viable
		params.nodes.window.setAttribute(attribute, 'true');

		if (params.state.gateControl) {
			params.nodes.control.classList.remove(params.props.strings.inert);
		}
	}, params.props.timing);
}

export default closeDialog; 