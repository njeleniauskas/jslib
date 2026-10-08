function addProps(module, params) {
	const attributes = (params.attributes ?? {});

	module.name = 'name' in params ? params.name : 'combobox';

	module.props.attributes.contextRole = 'contextRole' in attributes ?
		attributes.contextRole : `${module.attributePrefix}-role`;
	module.props.attributes.selected = 'selected' in attributes ?
		attributes.selected : 'data-selected';
	module.props.attributes.childName = 'childName' in attributes ?
		attributes.childName : `id`;
	module.props.attributes.expanded = 'expanded' in attributes ?
		attributes.expanded : 'data-expanded';
	module.props.attributes.hidden = 'hidden' in attributes ?
		attributes.hidden : 'data-hidden';
	module.props.attributes.valueMatch = 'valueMatch' in attributes ?
		attributes.valueMatch : 'data-value-match';

	module.props.preseed = 'preseed' in params ?
		params.preseed : false;
	module.props.searchable = 'searchable' in params ?
		params.searchable : true;
	module.props.searchMutatesChildren = 'searchMutatesChildren' in params ?
		params.searchMutatesChildren : false;
	module.props.searchDelay = 'searchDelay' in params ?
		params.searchDelay : 150;
	module.props.disclosable = 'disclosable' in params ?
		params.disclosable : true;
	module.props.discloseOnFocusin = 'discloseOnFocusin' in params ?
		params.discloseOnFocusin : true;

	module.props.returnFocusToComponent = 'returnFocusToComponent' in params ?
		params.returnFocusToComponent : true;

	module.props.selectable = 'selectable' in params ?
		params.selectable : true;
	module.props.selectBehavior = 'selectBehavior' in params ?
		params.selectBehavior : 'coupled';

	module.state.focusIndexOnQuery = null;
	module.state.isComposing = false;
	module.state.queryString = null;

	// modifiable args
	module.state.queryArgs = null;
	module.state.querySrc = null;
	module.state.dataSrc = null;
	module.state.data = null;
}

export default addProps;
