function openDialog(module, targetElement) {
	document.documentElement.setAttribute('style', 'overflow: hidden');

	if (module.props.isModal) {
		module.nodes.dialog.showModal();
	} else {
		module.nodes.dialog.show();
	}

	module.nodes.dialog.setAttribute(module.props.strings.hidden, 'false');
	module.nodes.dialog.classList.add(module.props.strings.transitionIn);

	module.state.returnElement = targetElement;

	module.emitter?.emit(`dialog/${module.id}:opened`);
}

export default openDialog;
