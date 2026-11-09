import openDialog from './open-dialog.js';

function initializeDialog(module) {
	const queryStrings = module.props.strings;

	module.nodes.control = [...document.querySelectorAll(queryStrings.control)];
	module.nodes.dialog = document.querySelector(queryStrings.dialog);

	if (module.nodes.dialog.nodeName.toLowerCase() !== 'dialog') {
		throw new Error('Dialog: <dialog> element is required for the dialog element.');
	}

	if (module.props.startOpen) {
		openDialog(module, document);
	}
}

export default initializeDialog;
