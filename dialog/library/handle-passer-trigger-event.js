import findItemByAttributeValue from '../../common/utilities/find-item-by-attribute-value.js';
import removeBracketsFromString from '../../common/utilities/remove-brackets-from-string.js';
import updateFocusPair from '../../common/focus-passer/update-focus-pair.js';

import openDialog from './open-dialog.js';
import closeDialog from './close-dialog.js';
import updateFocusStack from './update-focus-stack.js';
import updateStack from './stack-update.js';
import clearStack from './stack-clear.js';

/**
 * 
 * @param {object} params 
 * @param {object} params.props 
 * @param {object} params.nodes 
 * @param {object} params.state 
 * @param {object} node
 */

function handlePasserTriggerEvent(node, params) {
	const isControl = (node === params.nodes.control);
	const passerAttribute = removeBracketsFromString(params.props.strings.passer);
	const receiverAttribute = removeBracketsFromString(params.props.strings.receiver);
	const id = node.getAttribute(passerAttribute);
	const receiver = findItemByAttributeValue(params.nodes.receiver, receiverAttribute, id);

	const args = {
		update: {
			passer: node,
			receiver: receiver,
			id: id,
			stack: params.state.stack
		}
	};
	
	if (isControl) {
		if (!params.state.opened) {
			args.pass = {
				receiver: receiver,
				passer: node,
			};

			updateFocusStack(args.update, updateStack);
			openDialog(params);
			updateFocusPair(args.pass)
		} else {
			updateFocusStack(args.update, updateStack);
			closeDialog(params);
		}
	}

	if (!isControl) {
		args.pass = {
			receiver: receiver,
			passer: node,
		};

		updateFocusStack(args.update, clearStack);
		updateFocusPair(args.pass)
		closeDialog(params);
	} 
}

export default handlePasserTriggerEvent;