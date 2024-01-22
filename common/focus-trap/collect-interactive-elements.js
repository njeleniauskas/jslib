function collectInteractiveElements(node) {
	const selectors = `
		[tabindex]:not([tabindex="-1"]),
		[contentEditable=true]:not([tabindex="-1"]),
		a[href]:not([disabled]),
		area[href]:not([disabled]),
		audio[controls]:not([disabled]),
		button:not([disabled]),
		details summary:not([disabled]),
		dialog:not([disabled]),
		iframe:not([disabled]),
		input:not([disabled]),
		select:not([disabled]),
		textarea:not([disabled]),
		video[controls]:not([disabled])
	`;

	return Array.from(node.querySelectorAll(selectors));
}

export default collectInteractiveElements;