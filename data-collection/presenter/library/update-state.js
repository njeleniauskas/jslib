/**
 * 
 * @param {object} presenter - The presenter class.
 * @param {object} params 
 * @param {string} [params.display] - The current display type.
 * @param {number} [params.startingIndex] - The index to start rendering items. 
 * @param {number} [params.endingIndex] - The index to end rendering items. 
 * @param {number} [params.displaySize] - The number of items to display. 
 */

function updateState(presenter, params) {
	presenter.state = {...presenter.state, ...params};
}

export default updateState;