/**
 * @param {object} params
 * @param {object} params.language - The language object containing the direction and writingMode.
 * @param {string} params.orientation - the orientation of the component.
 * @param {object} params.navigationKeys -  The valid navigation keys, organized by orientation.
 * @param {class} module - The class module.
 */

function setLanguageAndNavigationData(params, module) {
	module.state.language = params.language;
	module.state.orientation = params.orientation;
	module.state.navigationKeys = params.navigationKeys;
}

export default setLanguageAndNavigationData;
