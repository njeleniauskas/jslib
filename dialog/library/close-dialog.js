async function closeDialog(module) {
	document.documentElement.removeAttribute('style');
	module.nodes.dialog.classList.remove(module.props.strings.transitionIn);
	module.nodes.dialog.classList.add(module.props.strings.transitionOut);

	const animations = module.nodes.dialog.getAnimations({ subtree: true });

	await Promise.allSettled(animations.map(anim => anim.finished));

	module.nodes.dialog.setAttribute(module.props.strings.hidden, 'true');
	module.nodes.dialog.classList.remove(module.props.strings.transitionOut);

	module.nodes.dialog.close();

	module.state.returnElement.focus();
	module.state.returnElement = null;

	module.functions.dialogClosed?.();
	module.emitter?.emit(`dialog/${module.id}:closed`);
}

export default closeDialog;
