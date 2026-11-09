function updateKeydownGate(module, params) {
	const { canUpdate } = params;
	module.state.canUpdate = canUpdate;
}

export default updateKeydownGate;
