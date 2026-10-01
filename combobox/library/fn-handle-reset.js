function handleReset(params) {
	const { module, context } = params;

	const contextRole = module.props.attributes.contextRole;
	const attribute = module.props.attributes.contextState;

	const componentContext = module.nodes.component.closest(`[${contextRole}="component"]`);

	componentContext.setAttribute(attribute, 'true');
	module.nodes.listbox.setAttribute(attribute, 'false');

	if (module.props.disclosable) {
		const attribute = module.props.attributes.display;

		if (module.nodes.listbox.getAttribute(attribute) === 'false') {
			module.nodes.listbox.setAttribute(attribute, 'true');
		}
	}
}

export default handleReset;
