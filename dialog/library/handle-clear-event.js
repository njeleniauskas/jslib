import clearStack from './stack-clear.js';
import updateFocusStack from './update-focus-stack.js';
import passFocus from './pass-focus.js';
import closeDialog from './close-dialog.js';

function handleClearEvent(params) {
	const context = params.state.stack[0];
	const args = {
		update: {
			stack: params.state.stack
		},
		pass: {
			passer: context.receiver,
			receiver: context.passer
		},
	};
	
	updateFocusStack(args.update, clearStack);
	passFocus(args.pass);
	closeDialog(params);
}

export default handleClearEvent;