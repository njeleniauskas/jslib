/**
 * Get the document's current language settings.
 * @returns {object} - Returns the document's direction and writing-mode.
 */

function getDocumentLanguageSettings() {
	let result = {
		'direction': getComputedStyle(document.body).direction,
		'writingMode': getComputedStyle(document.body)["writing-mode"]
	};

	return result;
}

export default getDocumentLanguageSettings;