import resetModule from './reset-module.js';

/**
 * @param {event} event - The focusout event.
 * @param {class} module - The main class module.
 */

function handleFocusoutEvent(event, module) {
	const contextSelector = `[${module.props.attributes.context}="${module.id}"]`;
	const isOutsideContext = event.relatedTarget !== null ? event.relatedTarget.closest(contextSelector) === null : false;

	if (module.state.isKeyEvent && isOutsideContext) {
		resetModule(module);

		if (module.emitter !== null) {
			module.emitter.emit(`${module.id}OnFocusout`, {
				context: module.state.nodes.context
			});
		}
	}
}

export default handleFocusoutEvent;
