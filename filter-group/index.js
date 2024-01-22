import invalidPropertyValue from '../common/utilities/invalid-property-value.js';
import attributeStateByValue from '../common/utilities/attribute-state-by-value.js';

import validateFilterGroupConfig from './library/validate-filter-group-config.js';
import getNodes from './library/get-nodes.js';
import addInterfaceEvents from './library/add-interface-events.js';
import addEmitterEvents from './library/add-emitter-events.js';
import updateFilterState from './library/update-filter-state.js';
import getToggleNodeState from './library/get-toggle-node-state.js';

/**
 * @param {object} params
 * @param {string} params.type - The type of control in the group (binary or input).
 * @param {object} params.attributes - Data attribute strings (without brackets).
 * @param {string} params.attributes.group - The group reference property (private).
 * @param {string} params.attributes.control - The attribute identifying filter controls.
 * @param {string} [params.attributes.toggle] - The attribute identifying the toggle element.
 * @param {string} [params.attributes.comparison] - Attribute identifying the element changing the comparison method.
 * @param {string} [params.attributes.method] - The attribute on the value node that stores the comparison method.
 * @param {string} [params.attributes.reset] - The attribute identifying the reset control.
 * 
 * @param {object} [params.indicators] - Strings inditacting the attribute or class states needed.
 * @param {string} [params.indicators.selected] - The selected-state attribute (must be accessible).
 * @param {string} [params.indicators.toggle] - The state attribute for the toggle control (must be accessible).
 * @param {string} [params.indicators.reset] - The class or attribute used to mark the reset control as 'available'. 
 * 
 * @param {boolean} [params.multiSelection] - Flag for single, or multiselection behavior.
 * @param {boolean} [params.selectionByValue] - Selected state is attribute=value, or a toggled attribute.
 * @param {boolean} [params.toggleByValue] - Toggle state is attribute=value, or toggled attribute.
 * @param {string} [params.resetType] - Whether the reseting indicator is a class or attribute.
 * @param {boolean} [params.resetByValue] - Flag: the flag for reset being available is either attribute=value, or toggled attribute.
 * @param {boolean} [params.delay] - The delay window for the keyup event on input elements.
 * @param {boolean} [params.toggleResetsFilter] - Toggle function will also reset the filter group.
 * @param {object} params.emitter - The event emitter (communication with other classes/components).
 */

class FilterGroup {
	constructor(params) {
		this.props = {
			'type': null,
			'group': null,
			'multiSelection': false,
			'attributes': {
				'group': null,
				'control': null,
				'toggle': null,
				'comparison': null,
				'method': null,
				'reset': null,
			},
			'indicators': {
				'selected': null,
				'toggle': null,
				'reset': null,
			},
			'selectionByValue': true,
			'toggleByValue': false,
			'resetType': null,
			'resetByValue': false,
			'delay': 250,
			'toggleResetsFilter': false,
		};
		this.nodes = {};
		this.emitter = {};
		this.state = {
			'active': true,
			'filter': {},
		};

		this.init(params);
	}

	init(params) {
		try {
			validateFilterGroupConfig(params);
			this.setConfiguration(params);
			this.initializeComponent();
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
		const {emitter, ...props} = params;

		this.props = {...this.props, ...props};
		this.emitter = params.emitter;

		if (this.props.type === 'input') {
			this.props.multiSelection = false;
		}

		if (!invalidPropertyValue(this.props.indicators, 'selected')) {
			this.props.selectionByValue = attributeStateByValue(this.props.indicators.selected);
		}

		if (!invalidPropertyValue(this.props.indicators, 'toggle')) {
			this.props.toggleByValue = attributeStateByValue(this.props.indicators.toggle);
		}
	}

	initializeComponent() {
		getNodes(this.nodes, this.props.attributes);
		addInterfaceEvents({
			'props': this.props,
			'nodes': this.nodes,
			'state': this.state,
			'emitter': this.emitter,
		});
		
		this.props.group = this.nodes.group.getAttribute(this.props.attributes.group);

		addEmitterEvents({
			'emitter': this.emitter,
			'group': this.props.group,
			'filter': this.state.filter,
		});

		if (!invalidPropertyValue(this.props.attributes, 'toggle')) {
			this.state.active = getToggleNodeState({
				'toggleByValue': this.props.toggleByValue,
				'node': this.nodes.toggle,
				'attribute': this.props.indicators.toggle,
			});
		}

		const args = {
			'type': this.props.type,
			'group': this.nodes.group.getAttribute(this.props.attributes.group),
			'nodes': this.nodes.control,
			'attributes': this.props.attributes,
			'indicators': this.props.indicators,
			'multiSelection': this.props.multiSelection,
			'selectionByValue': this.props.selectionByValue,
		};
		
		updateFilterState(this.state, args);
	}
}

export default FilterGroup;