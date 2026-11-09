function updateStepButtons(module) {
	const disabledAttribute = module.props.strings.disabled;
	const currentIndex = module.state.currentIndex;
	const lastIndex = module.data.lastIndex;

	module.nodes.buttonPrev.setAttribute(disabledAttribute, currentIndex === 0);
	module.nodes.buttonNext.setAttribute(disabledAttribute, currentIndex === lastIndex);
}

export default updateStepButtons;
