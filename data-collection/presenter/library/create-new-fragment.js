/**
 *
 * @param {object} params
 * @param {array} params.data
 * @param {string} params.display
 * @param {object} params.templates
 * @param {string} params.id
 * @param {number} params.startingIndex
 * @param {number} params.endingIndex
 * @param {string} params.collectionAttribute
 * @param {string} params.message
 */

function createNewFragment(params) {
	const fragment = document.createDocumentFragment();
	let collection;

	if (params.data.length !== 0) {
		const template = params.templates[params.display];

		collection = template(params.data, {
			'startingIndex': params.startingIndex,
			'endingIndex': params.endingIndex,
			'message': params.message
		});
	} else {
		collection = document.createElement('div');
		collection.textContent = params.message;
	}

	collection.setAttribute(params.collectionAttribute, params.id);
	fragment.appendChild(collection);

	return fragment;
}

export default createNewFragment;
