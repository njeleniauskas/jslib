function setRovingComponentFocus(module, value) {
	module.nodes.component.setAttribute(
		module.props.attributes.componentFocus,
		value
	);

	if (module.nodes.component !== module.state.nodes.context) {
		module.state.nodes.context.setAttribute('data-focused', value);
	}
}

export default setRovingComponentFocus;
