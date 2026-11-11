import isOutsideElement from './is-outside-element.js';
import openDialog from './open-dialog.js';
import closeDialog from './close-dialog.js';

function addEvents(module) {
	document.addEventListener('pointerdown', (event) => {
		const rect = module.nodes.dialog.getBoundingClientRect();
		module.state.pointerOriginInside = insideElement(event, rect);
	});

	document.addEventListener('pointerup', (event) => {
		const originInside = module.state.pointerOriginInside;
		module.state.pointerOriginInside = false;

		if (!module.nodes.dialog.open) return;
		if (originInside) return;
		if (!isOutsideElement(event, module.nodes.dialog)) return;
		if (module.nodes.control.includes(event.target)) return;

		closeDialog(module);
	});

	module.nodes.dialog.addEventListener('click', (event) => {
		const close = event.target.closest(module.props.strings.close);

		if (!close || !module.nodes.dialog.contains(close)) return;

		closeDialog(module);
	});

	module.nodes.dialog.addEventListener('cancel', (event) => {
		if (!module.state.cancelable) return;

		event.preventDefault();
		closeDialog(module);
	});

	module.nodes.control.forEach((control) => {
		control.addEventListener('click', () => {
			if (module.nodes.dialog.open) return;

			openDialog(module, control);
		});
	});

	module.functions.events?.(module);
}

function insideElement(event, rect) {
	return event.clientX >= rect.left &&
		event.clientX <= rect.right &&
		event.clientY >= rect.top &&
		event.clientY <= rect.bottom;
}

export default addEvents;
