import resetModule from './reset-module.js';

/**
 * @param {event} event - The focusout event.
 * @param {class} module - The main class module.
 */

function handleFocusoutEvent(event, module) {
	const contextSelector = `[${module.props.attributes.context}="${module.id}"]`;
	const targetOutsideContext = event.relatedTarget !== null ? event.relatedTarget.closest(contextSelector) === null : false;

	if (module.state.isKeyEvent && targetOutsideContext) {
		const context = module.state.nodes.context;
		resetModule(module);

		module.functions.reset?.({ module, context });
		module.emitter?.emit(`${module.name}/${module.id}:reset`, {
			context
		});
	}
}

export default handleFocusoutEvent;
