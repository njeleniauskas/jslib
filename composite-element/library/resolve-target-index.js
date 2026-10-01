function resolveTargetIndex(module) {
	if ('targetIndex' in module.functions) {
		return module.functions.targetIndex({
			children: module.state.nodes.children,
			pointerEventChild: module.state.nodes.pointerEventChild,
			attributes: module.props.attributes,
		});
	}

	if (module.state.nodes.pointerEventChild !== null) {
		return module.state.nodes.children.indexOf(module.state.nodes.pointerEventChild);
	}

	if (module.state.eventKey !== null && module.state.eventKey.key === 'Tab') {
		let targetIndex = 0;

		if (module.state.eventKey.shiftKey) {
			targetIndex = module.state.nodes.children.length - 1;
		}

		return targetIndex;
	}

	return 0;
}

export default resolveTargetIndex;
