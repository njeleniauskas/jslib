import handleFocusinEvent from './handle-focusin-event.js';
import handleFocusoutEvent from './handle-focusout-event.js';
import handlePointerdownEvent from './handle-pointerdown-event.js';
import handleGlobalPointerdownEvent from './handle-global-pointerdown-event.js';
import handleKeydownEvent from './handle-keydown-event.js';
import handleClickEvent from './handle-click-event.js';
import handleKeyupEvent from './handle-keyup-event.js';

function addEvents(module) {
	document.addEventListener(
		'pointerdown',
		(event) => handleGlobalPointerdownEvent(event, module)
	);

	document.addEventListener('pointerup', () => {
		module.state.isPointerEvent = false;
	});

	//required to understand focusin type
	document.addEventListener('keydown', () => {
		module.state.isKeyEvent = true;
	});

	document.addEventListener('keyup', () => {
		module.state.isKeyEvent = false;
	});

	module.data.nodes.contexts.forEach((context) => {
		context.addEventListener(
			'focusin',
			() => handleFocusinEvent(module)
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
