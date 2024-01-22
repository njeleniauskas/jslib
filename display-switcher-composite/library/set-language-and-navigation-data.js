import state from '../data/state.js';

function setLanguageAndNavigationData(params) {
	state.language = params.language;
	state.orientation = params.orientation;
	state.navigationKeys = params.navigationKeys;
}

export default setLanguageAndNavigationData;