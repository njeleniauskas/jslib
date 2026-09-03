/**
 * @param {object} params
 * @param {object} params.attributes
 * @param {string} params.attributes.viewNode - The data- attribute for the view elements.
 * @param {string} params.attributes.viewID - The data- attribute used to link controls and views.
 * @param {string} params.attributes.controlID - The data- attribute used to link views and controls.
 * @param {string} params.attributes.display - The data- attribute tracking the display status of views.
 * @returns object for the view configuration.
 */

function getViewConfig(params) {
	const attributes  = params.attributes;
	const props = {
		'attributes': {}
	};

	props.attributes.controlID = 'controlID' in attributes ? attributes.controlID : 'data-cn-control';
	props.attributes.viewID = 'viewID' in attributes ? attributes.viewID : 'data-cn-target';
	props.attributes.view = 'viewNode' in attributes ? attributes.viewNode : 'data-cn-view';
	props.attributes.display = 'display' in attributes ? attributes.display : 'data-cn-hidden';

	return props;
}

export default getViewConfig;
