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
		const context = module.state.nodes.context;
		resetModule(module);

		module.functions.reset?.({ module, context });
		module.emitter?.emit(`${module.name}/${module.id}:reset`, {
			context
		});
	}
}

export default handleGlobalPointerdownEvent;
