/**
 * 
 * @param {object} module - The class module.
 * @param {object} params - The configuration arguments.
 */

function setConfiguration(module, params) {
	let args = params;

	if ('emitter' in params) {
		module.emitter = params.emitter;
		Reflect.deleteProperty(args, 'emitter');
	}

	module.props = {...module.props, ...args};
}

export default setConfiguration;