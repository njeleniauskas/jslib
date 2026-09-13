import getNavigationKeys from './get-navigation-keys.js';
import getDocumentLanguageSettings from '../utilities/get-document-language-settings.js';

/**
 * Get the core state of the navigator.
 * @param {Object} params
 * @param {Object} params.node - The node to evaluate it's orientation.
 * @param {string} params.orientation - The attribute storing the orientation of the component.
 * @returns {Object} The core, context-based data needed for the navigator.
 */

function getLanguageAndNavigationContext(params) {
	const node = params.node;
	const orientation = params.orientation;
	const state = {};

	if (!node.hasAttribute(orientation)) {
		throw new Error('Orientation attribute missing. Cannot get navigation context.');
	}

	state.language = getDocumentLanguageSettings();
	state.orientation = node.getAttribute(orientation);
	state.navigationKeys = getNavigationKeys({
		'orientation': state.orientation,
		'languageSettings': state.language
	});

	return state;
}

export default getLanguageAndNavigationContext;
