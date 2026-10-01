function addProps(module, params) {
	const attributes = (params.attributes ?? {});

	module.name = 'name' in params ? params.name : 'display-switcher';

	module.props.attributes.viewNode = 'viewNode' in attributes ?
		attributes.viewNode : `${module.attributePrefix}-view`;
	module.props.attributes.controlID = 'controlID' in attributes ?
		attributes.controlID : `${module.attributePrefix}-control-id`;
	module.props.attributes.viewID = 'viewID' in attributes ?
		attributes.viewID : `${module.attributePrefix}-view-id`;
	module.props.attributes.selected = 'selected' in attributes ?
		attributes.selected : 'data-selected';
	module.props.attributes.display = 'display' in attributes ?
		attributes.display : 'data-hidden';
}

export default addProps;
