function formatSrc(string, format) {
	const regex = /\{[^}]*\}/;

	if (format.split(regex).length === 1) {
		return string;
	}

	const index = string.lastIndexOf('.');

	if (index === -1) return string;

	const file = string.slice(0, index);
	const extension = string.slice(index);

	return format.replace(regex, file) + extension;
}

export default formatSrc;
