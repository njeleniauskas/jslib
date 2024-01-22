import props from '../data/props.js';
import data from '../data/data.js';
import state from '../data/state.js';

import handleFocusinEvent from './handle-focusin-event.js';
import handleFocusoutEvent from './handle-focusout-event.js';
import handlePointerdownEvent from './handle-pointerdown-event.js';
import handleGlobalPointerdownEvent from './handle-global-pointerdown-event.js';
import handleKeydownEvent from './handle-keydown-event.js';
import handleClickEvent from './handle-click-event.js';
import handleKeyupEvent from './handle-keyup-event.js';

function addEvents() {	
	data.nodes.component.addEventListener('focusin', handleFocusinEvent);
	data.nodes.component.addEventListener('focusout', handleFocusoutEvent);

	document.addEventListener('pointerdown', handleGlobalPointerdownEvent);
	data.nodes.component.addEventListener('pointerdown', handlePointerdownEvent);

	document.addEventListener('pointerup', () => {
		state.isPointerEvent = false;
	});

	//required to understand focusin type
	document.addEventListener('keydown', () => {
		state.isKeyEvent = true;
	});

	data.nodes.component.addEventListener('keydown', handleKeydownEvent);

	document.addEventListener('keyup', () => {
		state.isKeyEvent = false;
	});

	data.nodes.component.addEventListener('click', handleClickEvent);
	data.nodes.component.addEventListener('keyup', handleKeyupEvent);
}

export default addEvents;