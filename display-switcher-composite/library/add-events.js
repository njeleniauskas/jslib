import handleFocusinEvent from './handle-focusin-event.js';
import handleFocusoutEvent from './handle-focusout-event.js';
import handlePointerdownEvent from './handle-pointerdown-event.js';
import handleGlobalPointerdownEvent from './handle-global-pointerdown-event.js';
import handleKeydownEvent from './handle-keydown-event.js';
import handleClickEvent from './handle-click-event.js';
import handleKeyupEvent from './handle-keyup-event.js';

function addEvents(module) {
	module.data.nodes.component.addEventListener(
		'focusin',
		() => handleFocusinEvent(module)
	);
	module.data.nodes.component.addEventListener(
		'focusout',
		(event) => handleFocusoutEvent(event, module)
	);

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

	module.data.nodes.component.addEventListener(
		'keydown',
		(event) => handleKeydownEvent(event, module)
	);

	document.addEventListener('keyup', () => {
		module.state.isKeyEvent = false;
	});

	module.data.nodes.component.addEventListener(
		'pointerdown',
		(event) => handlePointerdownEvent(event, module)
	);
	module.data.nodes.component.addEventListener(
		'click',
		(event) => handleClickEvent(event, module)
	);
	module.data.nodes.component.addEventListener(
		'keyup',
		(event) => handleKeyupEvent(event, module)
	);
}

export default addEvents;
