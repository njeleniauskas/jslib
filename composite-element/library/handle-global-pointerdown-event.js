import resetModule from './reset-module.js';

/**
 * @param {event} event - The global pointerdown event.
 * @param {class} module - The class module.
 */

function handleGlobalPointerdownEvent(event, module) {
	module.state.isPointerEvent = true;

	const contextSelector = `[${module.props.attributes.context}="${module.id}"]`;
	const isOutsideContext = event.target !== null ? event.target.closest(contextSelector) === null : false;

	if (isOutsideContext && !module.state.isInitial) {
		resetModule(module);

		if (module.emitter !== null) {
			module.emitter.emit(`${module.name}/${module.id}:reset`, {
				context: module.state.nodes.context
			});
		}
	}
}

export default handleGlobalPointerdownEvent;
