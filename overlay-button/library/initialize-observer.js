function initializeObserver(module) {
	return new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const topPosition = entry.boundingClientRect.top;
			const viewportHeight = window.innerHeight;

			if (entry.isIntersecting && topPosition <= viewportHeight) {
				module.state.blocked = true;
			} else {
				module.state.blocked = false;
			}
		});
	});
}

export default initializeObserver;