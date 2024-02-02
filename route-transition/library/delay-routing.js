/**
 * @param {event} event - The event triggered.
 * @param {object} node - The node that triggered the event.
 * @param {number} delay - The delay window before changing URLs.
 */

function delayLinkRouting(event, node, delay) {
	const URI = node.getAttribute('href');

	event.preventDefault();

	window.setTimeout(() => {
		window.location.href = URI;
	}, delay);
}

export default delayLinkRouting;