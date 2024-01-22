function delayLinkRouting(event, node, delay) {
	const URI = node.getAttribute('href');

	event.preventDefault();

	window.setTimeout(() => {
		window.location.href = URI;
	}, delay);
}

export default delayLinkRouting;