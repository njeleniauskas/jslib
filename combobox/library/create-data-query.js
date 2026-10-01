function createDataQuery(module, params) {
	if (module.emitter !== null && 'emitterReadyEvent' in params) {
		module.emitter.add(params.emitterReadyEvent, (args) => {
			module.emitter.emit(`${module.name}/${module.id}:query-function-end`)
		});
	}

	const callback = typeof params.callback === 'function' ?
		params.callback : null;

	return async (event, module) => {
		try {
			if (callback !== null) {
				await callback(event, module);
			}
		} catch (error) {
			console.error(error);
			throw error;
		}

		if (module.state.dataSrc !== module.state.querySrc) {
			module.state.dataSrc = module.state.querySrc;
		}

		if (!('emitterReadyEvent' in params)) module.functions.queryFunctionEnd(event, module);
	}
}

export default createDataQuery;
