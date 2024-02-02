import findItemByAttributeValue from '../../common/utilities/find-item-by-attribute-value.js';
import removeBracketsFromString from '../../common/utilities/remove-brackets-from-string.js';
import updateFocusPair from '../../common/focus-passer/update-focus-pair.js';

import openDialog from './open-dialog.js';
import closeDialog from './close-dialog.js';
import updateFocusStack from './update-focus-stack.js';
import updateStack from './stack-update.js';
import clearStack from './stack-clear.js';

/**
 * @param {object} node - The node that triggered the event.
 * @param {object} module - The class module.
 */

function handleControlPassingEvent(node, module) {
	const isControl = (node === module.nodes.control);
	const passerAttribute = removeBracketsFromString(module.props.strings.passer);
	const receiverAttribute = removeBracketsFromString(module.props.strings.receiver);
	const id = node.getAttribute(passerAttribute);
	const receiver = findItemByAttributeValue(module.nodes.receiver, receiverAttribute, id);

	const args = {
		update: {
			stack: module.state.stack,
			passer: node,
			receiver: receiver,
			id: id,
		}
	};
	
	if (isControl) {
		if (!module.state.opened) {
			args.pass = {
				receiver: receiver,
				passer: node,
			};

			updateFocusStack(args.update, updateStack);
			openDialog(module);
			updateFocusPair(args.pass)
		} else {
			updateFocusStack(args.update, updateStack);
			closeDialog(module);
		}
	}

	if (!isControl) {
		args.pass = {
			receiver: receiver,
			passer: node,
		};

		updateFocusStack(args.update, clearStack);
		updateFocusPair(args.pass)
		closeDialog(module);
	}
}

export default handleControlPassingEvent;