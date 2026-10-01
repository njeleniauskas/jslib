import CompositeElement from '../composite-element/index.js';

import addProps from './library/add-props.js';
import addFunctions from './library/add-functions.js';
import addEvents from './library/add-events.js';
import addNodes from './library/add-nodes.js';

/**
 * @param {object} params
 * @param {object} [params.attributes.] -
 */

class Combobox extends CompositeElement {
	constructor(params) {
		super({ ...params, navigationType: 'reference', attributePrefix: 'data-cb' });
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

	runQuery(params) {
		if (params) {
			this.updateQueryArgs(params);
		}

		this.functions.query(null, this);
	}

	updateQueryArgs(params) {
		this.state.querySrc = params.src ? params.src : this.state.querySrc;
		this.state.queryArgs = params.args ? params.args : this.state.queryArgs;
	}

	getFocusedChildName() {
		if (this.state.nodes.children !== null) {
			const child = this.state.nodes.children.find((child) => child.getAttribute(this.props.attributes.childFocus) === 'true');

			this.state.childNameBeforeMutation = child.getAttribute(this.props.attributes.childName);
		} else {
			this.state.childNameBeforeMutation = null;
		}
	}
}

export default Combobox;
