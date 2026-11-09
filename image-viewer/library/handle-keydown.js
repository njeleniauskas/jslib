import updateImageView from './update-image-view.js';
import updateStepButtons from './update-step-buttons.js';
import updateSummary from './update-summary.js';

function handleKeydown(key, module) {
	const conditions = {
		ArrowLeft: module.state.currentIndex === 0,
		ArrowRight: module.state.currentIndex === module.data.lastIndex,
		Home: module.state.currentIndex === 0,
		End: module.state.currentIndex === module.data.lastIndex
	};

	if (conditions[key]) return;

	const targetIndex = getTargetIndex(key, module);
	const item = module.data.images.find((item) => item.index === targetIndex);

	updateImageView(item, module);
	updateStepButtons(module);

	if (module.state.hasSummary) {
		updateSummary(module);
	}
}

function getTargetIndex(key, module) {
	const indecies = {
		ArrowLeft: module.state.currentIndex - 1,
		ArrowRight: module.state.currentIndex + 1,
		Home: 0,
		End: module.data.lastIndex
	};

	return indecies[key];
}

export default handleKeydown;
