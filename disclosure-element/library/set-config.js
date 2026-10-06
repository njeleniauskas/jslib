function setConfig(module, params) {
	module.id = params.id;

	module.props.attributes.control = 'control' in params.attributes ?
		params.attributes.control : 'data-de-control';

	module.props.attributes.target = 'target' in params.attributes ?
		params.attributes.target : 'data-de-target';

	module.props.attributes.pressed = 'pressed' in params.attributes ?
		params.attributes.pressed : 'data-pressed';

	module.props.attributes.visibility = 'visibility' in params.attributes ?
		params.attributes.visibility : 'data-hidden';

	if ('emitter' in params) {
		module.emitter = params.emitter;
		Reflect.deleteProperty(params, 'emitter');
	}
}

export default setConfig;
