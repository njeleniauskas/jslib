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
				'viewConfig': viewProps
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