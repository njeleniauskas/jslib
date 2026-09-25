import CompositeElement from '../composite-element/index.js';

import addProps from './library/add-props.js';
import addNodes from './library/add-nodes.js';
import addFunctions from './library/add-functions.js';
import addEvents from './library/add-events.js';

/**
 * Additional DisplaySwitcher params
 * @param {Object} params
 * @param {string} [params.attributes.viewNode] - The attribute used to identify view nodes.
 * @param {string} [params.attributes.controlID] - The attribute used to link controls and views.
 * @param {string} [params.attributes.viewID] - The attribute used to link view and controls.
 * @param {string} [params.attributes.selected] - The attribute representing the selected state.
 * @param {string} [params.attributes.display] - The attribute representing the display state for views.
 */

class DisplaySwitcher extends CompositeElement {
	constructor(params) {
		super({ ...params, attributePrefix: 'data-dsw' });
		this.#extendCompositeElement(params);
	}

	#extendCompositeElement(params) {
		try {
			addProps(this, params);
			addNodes(this);
			addFunctions(this, params);
			addEvents(this);
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
}

export default DisplaySwitcher;
