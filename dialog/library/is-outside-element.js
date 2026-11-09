function isOutsideElement(event, element) {
	const rect = element.getBoundingClientRect();

	return event.clientX < rect.left ||
		event.clientX > rect.right ||
		event.clientY < rect.top ||
		event.clientY > rect.bottom;
}

export default isOutsideElement;
