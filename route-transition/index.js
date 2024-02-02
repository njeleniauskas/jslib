import collectLocalLinks from './library/collect-links.js';
import collectAnimationNodes from './library/collect-animation-nodes.js';
import delayLinkRouting from './library/delay-routing.js';
import animateRouteChange from './library/animate-route-change.js';

/**
 * A class that handles sever-side rendered routing transitions.
 * @param {object} params - The parameters needed for the functions to work.
 * @param {string} params.domain - The string of the local domain.
 * @param {string} params.selector - The query selector for animation nodes.
 * @param {string} params.class - The class to trigger animation.
 * @param {number} params.delay - The delay window size.
 */

class RouteTransition {
	constructor(params) {
		this.links;
		this.nodes;
		this.props = params;

		this.init(params);
	}

	init(params) {
		document.addEventListener('readystatechange', (event) => {
			const isLoading = (event.target.readyState === 'loading');
			const query = '(prefers-reduced-motion: reduce)';
			const prefersReducedMotion = (window.matchMedia(query).matches === true);

			if (!isLoading && !prefersReducedMotion) {
				const links = collectLocalLinks(params.domain);
				const animationNodes = collectAnimationNodes(params.selector);

				this.links = links;
				this.nodes = animationNodes;
			
				links.forEach((link) => {
					link.addEventListener('click', (event) => {
						delayLinkRouting(event, link, params.delay);
						animateRouteChange(animationNodes, params.class);
					});
				});
			}
		});

		window.addEventListener('pageshow', (event) => {
			if (event.persisted) {
				this.nodes.forEach((node) => {
					if (node.classList.contains(params.class)) {
						node.classList.remove(params.class);
					}
				});
			}
		})
	}
}

export default RouteTransition;