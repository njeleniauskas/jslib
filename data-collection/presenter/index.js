import getPresenterNodes from './library/get-presenter-nodes.js';
import validateConfig from './library/validate-config.js';
import updateState from './library/update-state.js';
import addEmitterEvents from './library/add-emitter-events.js';

/**
 * A class handling the presentation-branch of a live data collection.
 * @param {Object} params
 * @param {string} params.id - The ID string of the associated elements.
 * @param {object} params.attributes
 * @param {string} params.attributes.container - The attribute identifying the container element.
 * @param {string} params.attributes.collection - The attribute identifying the collection element.
 * @param {string} params.attributes.message - The attribute identifying the message element.
 * @param {string} params.attributes.liveRegion - The attribute identifying the live region.
 * @param {function} params.templates - The item templates, organized by format (key).
 *
 * @param {object} [params.messages]
 * @param {function} [params.messages.empty] - The anon function that calls the template to use when items are empty.
 * @param {function} [params.messages.showing] - The anon function that calls the tempalte to use when at least 1 item exists.
 */

class DataCollectionPresenter {
	constructor(params) {
		this.id = null;
		this.props = {
			attributes: {
				container: null,
				collection: null,
				message: null,
				liveRegion: null,
			},
			templates: {},
			name: null,
		};
		this.messages = {
			empty: null,
			showing: null,
		};
		this.emitter = null;
		this.liveRegionManager = null;
		this.data = null;
		this.nodes = {};
		this.state = {
			display: 'list',
			startingIndex: null,
			endingIndex: null,
			displaySize: null,
		};

		this.#init(params);
	}

	#init(params) {
		try {
			validateConfig(params);
			this.#setConfiguration(params);
			this.#initializePresenter();
		} catch (errors) {
			if (errors instanceof AggregateError) {
				console.error(errors.message)

				for (const error of errors.errors) {
					console.error(error.message);
				}
			} else {
				console.error(errors);
			}
		}
	}

	#setConfiguration(params) {
		const {emitter, id, ...args} = params;
		this.props = {...this.props, ...args};
		this.emitter = params.emitter;
		this.id = params.id;

		const messages = params.messages ?? {};

		this.messages.empty = 'empty' in messages ?
			messages.empty
			: (presenter) => `No ${presenter.props.name} to display.`
		this.messages.showing = 'showing' in  messages ?
			messages.showing
			: (presenter) => `Showing ${presenter.state.displaySize} ${presenter.props.name}.`

		if ('liveRegionManager' in params) {
			this.liveRegionManager = params.liveRegionManager;
		}
	}

	#initializePresenter() {
		const templateKeys = Object.keys(this.props.templates);
		const props = {...this.props, id: this.id};

		this.nodes = getPresenterNodes(props);
		addEmitterEvents(this);
		updateState(this, {'display': templateKeys[0]});
	}
}

export default DataCollectionPresenter;
