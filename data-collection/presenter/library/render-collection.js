import createNewFragment from './create-new-fragment.js';

/**
 * 
 * @param {object} params.presenter - The presenter class (passed due to emitter usage).
 * @param {object} params.params - Parameters passed to this function (not needed/?)
 */

function renderCollection(presenter, params) {
	const attribute = presenter.props.attributes.collection;
	const id = presenter.id;
	let newFragment;
	let message;

	//at-time interpolation needed here
	if (presenter.data.live.length === 0) {
		message = `No ${presenter.props.name} to display.`;
	} else {
		message = `Showing ${presenter.state.displaySize} ${presenter.props.name}.`;
	}

	const args = {
		'data': presenter.data.live,
		'display': presenter.state.display,
		'templates': presenter.props.templates,
		'startingIndex': presenter.state.startingIndex,
		'endingIndex': presenter.state.endingIndex,
		'collectionAttribute': presenter.props.attributes.collection,
		'id': presenter.id,
		'message': message
	};

	newFragment = createNewFragment(args);
	presenter.nodes.collection = presenter.nodes.container.querySelector(`[${attribute}="${id}"]`);

	if (presenter.nodes.collection === null || presenter.nodes.collection === undefined) {
		presenter.nodes.container.appendChild(newFragment);
	} else {
		presenter.nodes.collection.replaceWith(newFragment);
		presenter.nodes.collection = newFragment;
	}

	if (presenter.liveRegionManager !== null) {
		presenter.liveRegionManager.addMessage(message);
	} else {
		presenter.nodes.liveRegion.innerHTML = message;
	}
}

export default renderCollection;