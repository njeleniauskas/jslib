const htmlElementNames = new Set([
	'a', 'button', 'input', 'select', 'textarea', 'summary', 'audio', 'video',
]);

function isFocusable(element) {

	if (!element) return false;

	const tagname = element.tagName.toLowerCase();

	if (element.hasAttribute('tabindex')) {
		return true;
	}

	if (tagname === 'a' || tagname === 'area') {
		return element.hasAttribute('href');
	}

	if (element.isContentEditable) {
		return true;
	}

	if (htmlElementNames.has(tagname)) {
		return !element.hasAttribute('disabled');
	}

	return false;
}

export default isFocusable;
