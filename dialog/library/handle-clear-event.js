import clearStack from './stack-clear.js';
import updateFocusStack from './update-focus-stack.js';
import closeDialog from './close-dialog.js';
import updateFocusPair from '../../common/focus-passer/update-focus-pair.js';

/**
 * @param {object} module - The class module.
 */

function handleClearEvent(module) {
	const context = module.state.stack[0];
	const args = {
		update: {
			stack: module.state.stack,
		},
		pass: {
			passer: context.receiver,
			receiver: context.passer
		},
	};
	
	updateFocusStack(args.update, clearStack);
	updateFocusPair(args.pass);
	closeDialog(module);
}

export default handleClearEvent;