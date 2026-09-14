import handleUpdateFocusState from './handle-update-focus-state.js';

function addEmitterEvents(module) {
	module.emitter.add(
		`${module.name}/${module.id}:focus-target-clicked`,
		(args) => handleUpdateFocusState(module, args)
	);
}

export default addEmitterEvents;
