function handleFocusStateUpdated(params) {
	const { module, event, targetChild } = params;
	const discloseOnFocusin = module.props.disclosable && module.props.discloseOnFocusin && event === 'focusin';
	const discloseOnKeydown = module.props.disclosable && event === 'keydown';

	if (discloseOnFocusin || discloseOnKeydown) {
		module.nodes.listbox.setAttribute(module.props.attributes.display, 'false');
	}
}

export default handleFocusStateUpdated;
