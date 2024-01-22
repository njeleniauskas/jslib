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
 * @param {string} params.attributes.liveRegion - The attribute identifying the live region.
 * @param {function} params.templates - The item templates, organized by format (key).
 */

class DataCollectionPresenter {
	constructor(params) {
		this.props = {
			'id': null,
			'attributes': {
				'container': null,
				'collection': null,
				'liveRegion': null,
			},
			'templates': {},
			'name': null,
			'messages' : {
				'emptyCollection': null,
				'updatedCollection': null,
			}
		};
		this.emitter = null;
		this.data = null;
		this.nodes = {};
		this.state = {
			'display': 'list',
			'startingIndex': null,
			'endingIndex': null,
			'displaySize': null,
		};

		this.init(params);
	}
	
	init(params) {
		try {
			validateConfig(params);
			this.setConfiguration(params);
			this.initializePresenter();
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

	setConfiguration(params) {
		const {emitter, ...args} = params;

		this.props = {...this.props, ...args};
		this.emitter = params.emitter;
	}

	initializePresenter() {
		const templateKeys = Object.keys(this.props.templates);
		
		this.nodes = getPresenterNodes(this.props);
		addEmitterEvents({
			'module': this,
			'emitter': this.emitter,
		});
		updateState(this, {'display': templateKeys[0]});
	}
}

export default DataCollectionPresenter;