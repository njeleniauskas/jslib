function handleFocusStateUpdated(params) {
	const { module, eventType, targetChild } = params;
	const discloseOnFocusin = module.props.disclosable && module.props.discloseOnFocusin && eventType === 'focusin';
	const discloseOnKeydown = module.props.disclosable && eventType === 'keydown';

	if (discloseOnFocusin || discloseOnKeydown) {
		module.nodes.listbox.setAttribute(module.props.attributes.display, 'false');
	}
}

export default handleFocusStateUpdated;
