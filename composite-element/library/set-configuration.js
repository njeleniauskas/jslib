function setConfiguration(module, config) {
	module.id = config.id;
	module.props.attributes.context = config.attributes.context;
	module.props.attributes.component = config.attributes.component;
	module.props.attributes.parent = config.attributes.parent;
	module.props.attributes.child = config.attributes.child;

	module.props.attributes.orientation = config.attributes.orientation;
	module.props.attributes.activeDescendant = config.attributes.activeDescendant;

	module.props.attributes.contextState = config.attributes.contextState;
	module.props.attributes.componentFocus = config.attributes.componentFocus;
	module.props.attributes.childFocus = config.attributes.childFocus;
	// module.props.attributes.childSelection = config.attributes.childSelection;

	module.props.navigationType = config.navigationType;
}

export default setConfiguration;
