function normalizeConfig(params) {
	const fallbackRoot = 'data-cn';
	const attributes = (params.attributes ?? {});
	const props = {};

	props.view = 'viewNode' in attributes ?
		attributes.viewNode : `${fallbackRoot}-view`;
	props.controlID = 'controlID' in attributes ?
		attributes.controlID : `${fallbackRoot}-control-id`;
	props.viewID = 'viewID' in attributes ?
		attributes.viewID : `${fallbackRoot}-view-id`;
	props.selected = 'selected' in attributes ?
		attributes.selected : 'data-selected';
	props.display = 'display' in attributes ?
		attributes.display : 'data-hidden';

	return props;
}

export default normalizeConfig;
