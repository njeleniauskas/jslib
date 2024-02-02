import debounce from '../../common/utilities/debounce.js';
import computeScrollState from './compute-scroll-state.js';

/**
 * @param {object} module - The class module.
 */

function initializeScrollEvents(module) {
	const props = module.props;
	
	window.addEventListener('scroll', debounce(() => {
		let isWithinBoundary;
		
		module.state.scrolled = Math.floor(window.scrollY);

		isWithinBoundary = (module.state.scrolled >= module.state.startPosition && 
			module.state.blocked !== true);

		if (isWithinBoundary) {
			module.nodes.control.setAttribute(props.strings.hidden, 'false');
			module.nodes.control.classList.add(props.strings.visibility);
		} else {
			if (module.nodes.control.classList.contains(props.strings.visibility)) {
				module.nodes.control.classList.remove(props.strings.visibility);
	
				setTimeout(() => {
					module.nodes.control.setAttribute(props.strings.hidden, 'true');
				}, props.timing);
			}
		}
	}, props.delay));

	
	window.addEventListener('resize', debounce(() => {
		module.state = computeScrollState(module);
	}, props.delay));
}

export default initializeScrollEvents;