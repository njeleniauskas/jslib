import props from './data/props.js';
import data from './data/data.js';
import state from './data/state.js';

import getNavigationConfig from '../common/composite-navigation/get-navigation-config.js';
import getReferenceNodes from '../common/composite-navigation/get-reference-nodes.js';
import getNavigationContext from '../common/composite-navigation/get-navigation-context.js';
import getLanguageAndNavigationContext from '../common/composite-navigation/get-language-and-navigation-context.js';
import validateNavigationConfig from '../common/composite-navigation/validate-navigation.config.js';
import validateReferenceNodes from '../common/composite-navigation/validate-reference-nodes.js';

import setConfiguration from './library/set-configuration.js';
import setReferenceNodes from './library/set-reference-nodes.js';
import setLanguageAndNavigationData from './library/set-language-and-navigation-data.js';
import setNavigationContext from './library/set-navigation-context.js';
import addEvents from './library/add-events.js';
import getViewConfig from './library/get-view-config.js';

/**
 * A component that handles the toggling of sections within a page, from a controllable composite element.
 * @param {object} params
 * @param {object} params.id - The id used to identify the collection of elements.
 * @param {object} params.attributes - 
 * @param {string} [params.attributes.componentNode] - The data- attribute for the component node.
 * @param {string} [params.attributes.contextNode] - The data- attribute for context nodes.
 * @param {string} [params.attributes.parentNode] - The data- attribute for the parent node.
 * @param {string} [params.attributes.childNode] - The data- attribute for child nodes.
 * @param {string} [params.attributes.eventNode] - The data- attribute for the node events will be attached to.
 * @param {string} [params.attributes.orientation] - Optional property to assign aria- string.
 * @param {string} [params.attributes.activeDescendant] -  Optional property to assign aria- string.
 * @param {string} [params.attributes.referenceFocus] - String based on roving or reference navigation needs.
 * @param {string} [params.attributes.childFocus] - String based on roving or reference navigation needs.
 * @param {string} [params.attributes.selected] - Used to allow function to know last component selection.
 *
 * @param {string} params.attributes.viewNode - The data- attribute for the view elements.
 * @param {string} params.attributes.viewID - The data- attribute used to link controls and views.
 * @param {string} params.attributes.controlID - The data- attribute used to link views and controls.
 * @param {string} params.attributes.display - The data- attribute tracking the display status of views.
 */

class DisplaySwitcherComposite {
	constructor(params) {
		this.props = props;
		this.data = data;
		this.state = state;
		this.init(params);
	}

	init(params) {
		try {
			const navigationProps = getNavigationConfig(params);
			const viewProps = getViewConfig(params);
			let referenceNodes;
			let contextNodes;
			let languageAndNavigationData;

			validateNavigationConfig(navigationProps);
			setConfiguration({
				'navConfig': navigationProps, 
				'viewConfig': viewProps,
			});
	
			referenceNodes = getReferenceNodes({
				'id': props.id,
				'nodes': {
					'component': {
						'array': false,
						'attribute': props.attributes.component
					},
					'reference': {
						'array': false,
						'attribute': props.attributes.reference
					},
					'contexts': {
						'array': true,
						'attribute': props.attributes.context
					},
					'views': {
						'array': true,
						'attribute': props.attributes.view
					}
				}
			});

			validateReferenceNodes(referenceNodes);
			setReferenceNodes(referenceNodes);

			contextNodes = getNavigationContext({
				'contexts': data.nodes.contexts,
				'id': props.id,
				'childAttribute': props.attributes.child,
				'parentAttribute': props.attributes.parent,
				'initializing': true,
			});

			setNavigationContext(contextNodes);

			languageAndNavigationData = getLanguageAndNavigationContext({
				'node': data.nodes.reference,
				'orientationAttribute': props.attributes.orientation
			});
			
			setLanguageAndNavigationData(languageAndNavigationData);
			addEvents();
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

export default DisplaySwitcherComposite;