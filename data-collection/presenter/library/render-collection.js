import createNewFragment from './create-new-fragment.js';

/**
 *
 * @param {object} params.presenter - The presenter class (passed due to emitter usage).
 * @param {object} params.params - Parameters passed to this function (not needed/?)
 */

function renderCollection(presenter) {
	presenter.emitter.emit('render-collection-start');

	const attribute = presenter.props.attributes.collection;
	const id = presenter.id;
	let newFragment;
	let message;

	if (presenter.data.live.length === 0) {
		message = presenter.messages.empty(presenter);
	} else {
		message = presenter.messages.showing(presenter);
	}

	const args = {
		'data': presenter.data.live,
		'display': presenter.state.display,
		'templates': presenter.props.templates,
		'startingIndex': presenter.state.startingIndex,
		'endingIndex': presenter.state.endingIndex,
		'collectionAttribute': presenter.props.attributes.collection,
		'messageAttribute': presenter.props.attributes.message,
		'id': presenter.id,
		'message': message
	};

	newFragment = createNewFragment(args);
	presenter.nodes.collection = presenter.nodes.container.querySelector(`[${attribute}="${id}"]`);

	if (presenter.nodes.collection !== null || presenter.nodes.collection !== undefined) {
		presenter.nodes.container.replaceChildren();
	}

	presenter.nodes.container.appendChild(newFragment);

	if (presenter.liveRegionManager !== null) {
		presenter.liveRegionManager.addMessage(message);
	} else {
		presenter.nodes.liveRegion.innerHTML = message;
	}

	presenter.emitter.emit('render-collection-end', {
		displaySize: presenter.state.displaySize
	});
}

export default renderCollection;
