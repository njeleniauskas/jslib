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