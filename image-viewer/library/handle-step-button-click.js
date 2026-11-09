import updateImageView from './update-image-view.js';
import updateStepButtons from './update-step-buttons.js';
import updateSummary from './update-summary.js';

function handleStepButtonClick(direction, module) {
	const step = direction === 'next' ? 1 : -1;

	module.state.currentIndex = module.state.currentIndex + step;

	const item = module.data.images.find((item) => item.index === module.state.currentIndex);

	updateImageView(item, module);
	updateStepButtons(module)

	if (module.state.hasSummary) {
		updateSummary(module);
	}
}

export default handleStepButtonClick;
