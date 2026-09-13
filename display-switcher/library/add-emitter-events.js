import handleUpdateFocusState from './handle-update-focus-state.js';

function addEmitterEvents(module) {
	module.emitter.add(`${module.id}OnKeyup`, (args) => handleUpdateFocusState(module, args));
	module.emitter.add(`${module.id}OnClick`, (args) => handleUpdateFocusState(module, args));
}

export default addEmitterEvents;
