/**
 * @param {object} params 
 * @param {string} params.viewNode - The data- attribute for the view elements.
 * @param {string} params.viewID - The data- attribute used to link controls and views.
 * @param {string} params.controlID - The data- attribute used to link views and controls.
 * @param {string} params.display - The data- attribute tracking the display status of views.
 * @returns object for the view configuration.
 */

function getViewConfig(params) {
	const attributes  = params.attributes;
	const props = {
		'attributes': {}
	};

	props.attributes.controlID = 'controlID' in attributes ? attributes.controlID : 'data-control';
	props.attributes.viewID = 'viewID' in attributes ? attributes.viewID : 'data-target';
	props.attributes.view = 'viewNode' in attributes ? attributes.viewNode : 'data-ce-view';
	props.attributes.display = 'display' in attributes ? attributes.display : 'data-hidden';

	return props;
}

export default getViewConfig;