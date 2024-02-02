import state from '../data/state.js';

/**
 * @param {object} params 
 * @param {object} params.language - The language object containing the direction and writingMode.
 * @param {string} params.orientation - the orientation of the component.
 * @param {object} params.navigationKeys -  The valid navigation keys, organized by orientation.
 */

function setLanguageAndNavigationData(params) {
	state.language = params.language;
	state.orientation = params.orientation;
	state.navigationKeys = params.navigationKeys;
}

export default setLanguageAndNavigationData;