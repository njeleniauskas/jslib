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
			'attribute': params.collectionAttribute,
			'id': params.id,
			'startingIndex': params.startingIndex,
			'endingIndex': params.endingIndex,
		});
	} else {
		collection = document.createElement('div');
		collection.setAttribute(params.collectionAttribute, params.id);
		collection.textContent = params.message;
	}

	fragment.appendChild(collection);
	
	return fragment;
}

export default createNewFragment;