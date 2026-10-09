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
 * @param {string} params.messageAttribute
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
			'attribute': params.collectionAttribute,
			'id': params.id
		});
	}

	const message = document.createElement('div');

	message.setAttribute(params.messageAttribute, params.id);
	message.textContent = params.message;

	fragment.appendChild(message);

	if (collection instanceof Element) {
		fragment.appendChild(collection);
	}

	return fragment;
}

export default createNewFragment;
