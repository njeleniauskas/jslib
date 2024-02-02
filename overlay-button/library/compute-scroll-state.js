/**
 * @param {object} module - The class module.
 * @returns object containing viewport information.
 */

function computeScrollState(module) {
	return {
		viewportHeight: window.innerHeight,
		scrolled: Math.floor(window.scrollY),
		startPosition: Math.floor(window.innerHeight * module.props.screenfuls),
		blocked: module.state.blocked,
	}
}

export default computeScrollState;