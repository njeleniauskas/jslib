/**
 * @param {object} params
 * @param {object} params.navConfig - The configuration object for navigation.
 * @param {object} params.viewConfig - The configuration object for the state of the component.
 */

function setConfiguration(params, props) {
	const { navConfig, viewConfig } = params;

	//nav config
	props.id = navConfig.id;
	props.attributes.context = navConfig.attributes.context;
	props.attributes.reference = navConfig.attributes.reference;
	props.attributes.parent = navConfig.attributes.parent;
	props.attributes.child = navConfig.attributes.child;

	props.attributes.contextState = navConfig.attributes.contextState;
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
