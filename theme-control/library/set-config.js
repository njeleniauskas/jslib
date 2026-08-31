function setConfig(module, params) {
	const {strings, ...args} = params;

	module.props = {...module.props, ...args};
	module.props.strings = {...module.props.strings, ...params.strings};
}

export default setConfig;