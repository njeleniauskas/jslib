import handleGlobalPointerdownEvent from './handle-global-pointerdown-event.js';
import handleFocusinEvent from './handle-focusin-event.js';
import handleFocusoutEvent from './handle-focusout-event.js';
import handlePointerdownEvent from './handle-pointerdown-event.js';
import handleClickEvent from './handle-click-event.js';
import handleKeydownEvent from './handle-keydown-event.js';
import handleKeyupEvent from './handle-keyup-event.js';

function addEvents(module) {
	document.addEventListener(
		'pointerdown',
		(event) => handleGlobalPointerdownEvent(event, module)
	);

	document.addEventListener('pointerup', () => {
		module.state.isPointerEvent = false;
	});

	document.addEventListener('keydown', (event) => {
		module.state.isKeyEvent = true;
		module.state.eventKey = {
			key: event.key,
			shiftKey: event.shiftKey
		};
	});

	document.addEventListener('keyup', () => {
		module.state.isKeyEvent = false;
		module.state.eventKey = null;
	});

	module.nodes.contexts.forEach((context) => {
		context.addEventListener(
			'focusin',
			(event) => handleFocusinEvent(event, module)
		);
		context.addEventListener(
			'focusout',
			(event) => handleFocusoutEvent(event, module)
		);

		context.addEventListener(
			'pointerdown',
			(event) => handlePointerdownEvent(event, module)
		);
		context.addEventListener(
			'click',
			(event) => handleClickEvent(event, module)
		);

		context.addEventListener(
			'keydown',
			(event) => handleKeydownEvent(event, module)
		);
		context.addEventListener(
			'keyup',
			(event) => handleKeyupEvent(event, module)
		);
	});
}

export default addEvents;
