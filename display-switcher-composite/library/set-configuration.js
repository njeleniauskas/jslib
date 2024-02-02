import props from '../data/props.js';

/**
 * @param {object} params 
 * @param {object} params.navConfig - The configuration object for navigation.
 * @param {object} params.viewConfig - The configuration object for the state of the component.
 */

function setConfiguration(params) {
	const navConfig = params.navConfig;
	const viewConfig = params.viewConfig;

	//nav config
	props.id = navConfig.id;
	props.attributes.component = navConfig.attributes.component;
	props.attributes.reference = navConfig.attributes.reference;
	props.attributes.context = navConfig.attributes.context;
	props.attributes.parent = navConfig.attributes.parent;
	props.attributes.child = navConfig.attributes.child;

	props.attributes.orientation = navConfig.attributes.orientation;
	props.attributes.activeDescendant = navConfig.attributes.activeDescendant;
	props.attributes.referenceFocus = navConfig.attributes.referenceFocus;
	props.attributes.childFocus = navConfig.attributes.childFocus;
	props.attributes.selected = navConfig.attributes.selected;

	props.navigationType = navConfig.navigationType;
	props.selection = navConfig.selection;

	//view config
	props.attributes.controlID = viewConfig.attributes.controlID;
	props.attributes.viewID = viewConfig.attributes.viewID;
	props.attributes.view = viewConfig.attributes.view;
	props.attributes.display = viewConfig.attributes.display;
}

export default setConfiguration;