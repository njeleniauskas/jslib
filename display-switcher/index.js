import CompositeElement from '../composite-element/index.js';
import EventEmitter from '../event-emitter/index.js';

import normalizeConfig from './library/normalize-config.js';
import getTargetIndex from './library/get-target-index.js';
import addEmitterEvents from './library/add-emitter-events.js';

/**
 * @param {object} params
 */

class DisplaySwitcher extends CompositeElement {
	constructor(params) {
		super(params);
		this.extendCompositeElement(params);
	}

	extendCompositeElement(params) {
		this.name = 'name' in params ? params.name : 'display-switcher';

		this.props.attributes = {
			...this.props.attributes,
			...normalizeConfig(params)
		}

		if (this.emitter === null) {
			this.emitter = new EventEmitter();
		}

		const queryString = `[${this.props.attributes.view}="${this.id}"]`;
		this.nodes.views = Array.from(document.querySelectorAll(queryString));

		if (!('targetIndex' in this.functions)) {
			this.functions.targetIndex = getTargetIndex;
		}

		addEmitterEvents(this);
	}
}

export default DisplaySwitcher;
