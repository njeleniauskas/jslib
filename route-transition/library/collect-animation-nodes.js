/**
 * @param {string} selector - The querySelector to collet an array of nodes.
 * @returns array of DOM elements.
 */
function collectAnimationNodes(selector) {
	return Array.from(document.querySelectorAll(selector));
}

export default collectAnimationNodes;