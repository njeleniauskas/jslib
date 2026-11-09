function formatSrc(string, format) {
	const parts = getURIParts(string);
	let result = format;

	for (const [key, value] of Object.entries(parts)) {
		result = result.replace(key, value);
	}

	return result;
}

function getURIParts(string) {
	const indexPath = string.lastIndexOf('/');
	const indexExtension = string.lastIndexOf('.');

	const path = indexPath !== -1 ? string.slice(0, indexPath + 1) : '';
	const extension = string.slice(indexExtension);
	const file = string.slice(indexPath === -1 ? 0 : indexPath + 1, indexExtension);

	return {
		'{path}': path,
		'{ext}': extension,
		'{file}': file
	};
}

export default formatSrc;
