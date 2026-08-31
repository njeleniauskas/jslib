function setConfig(module, params) {
	module.props.attributes.control = 'control' in params.attributes ?
		params.attributes.control : 'data-de-control';

	module.props.attributes.target = 'target' in params.attributes ?
		params.attributes.target : 'data-de-target';

	module.props.attributes.pressed = 'pressed' in params.pressed ?
		params.attributes.pressed : 'data-pressed';

	module.props.attributes.visibility = 'visibility' in params.visibility ?
		params.attributes.visibility : 'data-hidden';
}

export default setConfig;
