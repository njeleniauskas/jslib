import createProps from './data/props.js';
import createData from './data/data.js';
import createState from './data/state.js';

import getNavigationConfig from '../common/composite-navigation/get-navigation-config.js';
import getDomNodes from '../common/composite-navigation/get-dom-nodes.js';
import getNavigationContext from '../common/composite-navigation/get-navigation-context.js';
import getLanguageAndNavigationContext from '../common/composite-navigation/get-language-and-navigation-context.js';
import validateNavigationConfig from '../common/composite-navigation/validate-navigation.config.js';
import validateDomNodes from '../common/composite-navigation/validate-dom-nodes.js';

import setConfiguration from './library/set-configuration.js';
import setDomNodes from './library/set-dom-nodes.js';
import setLanguageAndNavigationData from './library/set-language-and-navigation-data.js';
import setNavigationContext from './library/set-navigation-context.js';
import addEvents from './library/add-events.js';
import getViewConfig from './library/get-view-config.js';

/**
 * A component that handles the toggling of sections within a page, from a controllable composite element.
 * @param {object} params
 * @param {string} params.id - The id used to identify the collection of elements.
 *
 * @param {object} [params.attributes]
 * @param {string} [params.attributes.controlID] - The data- attribute used to link views and controls.
 * @param {string} [params.attributes.viewID] - The data- attribute used to link controls and views.
 * @param {string} [params.attributes.viewNode] - The data- attribute for the view elements.
 * @param {string} [params.attributes.display] - The data- attribute tracking the display status of views.
 *
 * Composite navigation params
 * @param {string} [params.attributes.contextNode] - The data- attribute for context nodes.
 * @param {string} [params.attributes.parentNode] - The data- attribute for the parent node.
 * @param {string} [params.attributes.childNode] - The data- attribute for child nodes.
 * @param {string} [params.attributes.eventNode] - The data- attribute for the node events will be attached to.
 * @param {string} [params.attributes.contextState] - The data- attribute to ID the current context.
 * @param {string} [params.attributes.orientation] - Optional property to assign aria- string.
 * @param {string} [params.attributes.activeDescendant] -  Optional property to assign aria- string.
 * @param {string} [params.attributes.componentFocus] - The component attribute based on the type of navigation.
 * @param {string} [params.attributes.childFocus] - The child attribute based on the type of navigation.
 * @param {string} [params.attributes.selected] - The attribute that expresses the state of a control (selected, checked, etc…).
 *
 */

class DisplaySwitcherComposite {
	constructor(params) {
		this.props = createProps();
		this.data = createData();
		this.state = createState();

		this.init(params);
	}

	init(params) {
		try {
			const navigationProps = getNavigationConfig(params);
			const viewProps = getViewConfig(params);
			let component;
			let contextNodes;
			let languageAndNavigationData;

			validateNavigationConfig(navigationProps);
			setConfiguration({
				'navConfig': navigationProps,
				'viewConfig': viewProps,
			}, this.props);

			component = getDomNodes({
				'id': this.props.id,
				'nodes': {
					'contexts': {
						'array': true,
						'attribute': this.props.attributes.context
					},
					'component': {
						'array': false,
						'attribute': this.props.attributes.component
					},
					'views': {
						'array': true,
						'attribute': this.props.attributes.view
					}
				}
			});

			validateDomNodes(component);
			setDomNodes(component, this);

			contextNodes = getNavigationContext(
				'initial',
				{
					'contexts': this.data.nodes.contexts,
					'attribute': this.props.attributes.contextState,

					'id': this.props.id,
					'parentAttribute': this.props.attributes.parent,
					'childAttribute': this.props.attributes.child,
				}
			);

			setNavigationContext(contextNodes, this);

			languageAndNavigationData = getLanguageAndNavigationContext({
				'node': this.data.nodes.component,
				'orientationAttribute': this.props.attributes.orientation
			});

			setLanguageAndNavigationData(languageAndNavigationData, this);
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

export default DisplaySwitcherComposite;
