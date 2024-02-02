function isBackForwardEvent() {
	const entries = window.performance.getEntriesByType('navigation');
	const result = entries.some((item) => item.type === 'back_forward');

	return result;
}

export default isBackForwardEvent;