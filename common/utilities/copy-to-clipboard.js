async function copyToClipboard(element) {
	try {
		const codeBlock = element.textContent;
		await navigator.clipboard.writeText(codeBlock);
	} catch (error) {
		console.error(error.message);
	}
}

export default copyToClipboard;
