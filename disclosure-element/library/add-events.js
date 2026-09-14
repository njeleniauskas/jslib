function addEvents(module) {
	module.nodes.control.addEventListener('click', (event) => {
		const pressed = module.nodes.control.getAttribute(module.props.attributes.pressed) === 'true';

		module.nodes.control.setAttribute(module.props.attributes.pressed, String(!pressed));
		module.nodes.target.setAttribute(module.props.attributes.visibility, String(pressed));

		if (module.emitter) {
			module.emitter.emit('disclosure-element:click', !pressed);
		}
	});
}

export default addEvents;
