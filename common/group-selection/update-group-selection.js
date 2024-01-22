/**
 * 
 * @param {array} nodes - The array of controls to operate on.
 * @param {function} callback - The single- or multi-control update function.
 * @param {object} params - Arguments needed for the update functions to work.
 */

function updateGroupSelection(nodes, callback, params) {
	callback(nodes, params);
}

export default updateGroupSelection;