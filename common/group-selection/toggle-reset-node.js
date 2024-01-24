/**
 * Toggle show/hide classes on the reset node.
 * @param {object} params
 * @param {object} params.node - The reset node.
 * @param {string} params.indicatorVisible - The class to flag the node as visible.
 * @param {string} params.indicatorHidden - The class to flag the node as 'moving to hidden'.
 * @param {number} params.timing - The delay window to trigger the pointerVisibility attribute to "hidden".
 */

function toggleResetNode(params) {
	const isVisible = params.node.classList.contains(params.indicatorVisible);

	if (!isVisible) {
		params.node.classList.remove(params.indicatorHidden);
		params.node.classList.add(params.indicatorVisible);
	} else {
		params.node.classList.remove(params.indicatorVisible);
		params.node.classList.add(params.indicatorHidden);

		setTimeout(() => {
			params.node.classList.remove(params.indicatorHidden);
		}, params.timing);
	}
}

export default toggleResetNode;