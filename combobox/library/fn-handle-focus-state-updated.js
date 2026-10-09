function handleFocusStateUpdated(params) {
	const { module, event, targetChild } = params;
	const discloseOnFocusin = module.props.disclosable && module.props.discloseOnFocusin && event.type === 'focusin';
	const discloseOnKeydown = module.props.disclosable && event.type === 'keydown';

	if (discloseOnFocusin || discloseOnKeydown) {
		module.nodes.component.setAttribute(module.props.attributes.expanded, 'true');
		module.nodes.collection.setAttribute(module.props.attributes.hidden, 'false');
	}

	// case: collection is scrollable
	if (targetChild !== null) {
		targetChild.scrollIntoView({
			block: 'nearest'
		});
	}
}

export default handleFocusStateUpdated;
