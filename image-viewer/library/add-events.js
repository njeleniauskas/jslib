import handleKeydown from './handle-keydown.js';
import handleStepButtonClick from './handle-step-button-click.js';
import updateImageView from './update-image-view.js';
import updateStepButtons from './update-step-buttons.js';
import updateSummary from './update-summary.js';
import updateKeydownGate from './update-keydown-gate.js';
import getSwipeData from './get-swipe-data.js';

function addEvents(module) {
	if (module.state.hasButtons) {
		document.addEventListener('keydown', (event) => {
			if (!module.state.canUpdate) return;
			if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

			handleKeydown(event.key, module);
		});

		module.nodes.buttonPrev.addEventListener('click', () => {
			if (module.state.currentIndex === 0) return;
			handleStepButtonClick('prev', module);
		});

		module.nodes.buttonNext.addEventListener('click', () => {
			if (module.state.currentIndex === module.data.lastIndex) return;
			handleStepButtonClick('next', module);
		});
	}

	if (module.nodes.imageControl.length !== 0) {
		module.nodes.imageControl.forEach((control) => {
			const src = control.getAttribute('data-src');
			const item = module.data.images.find((item) => item.src === src);

			control.addEventListener('click', () => {
				if (item.index !== module.state.currentIndex) {
					updateImageView(item, module);

					if (module.state.hasButtons) {
						updateStepButtons(module);
					}

					if (module.state.hasSummary) {
						updateSummary(module);
					}
				}
			});
		});
	}

	if (module.state.canSwipe) {
		module.nodes.gallery.addEventListener('pointerdown', (event) => {
			if (event.currentTarget.closest('button, input, div[role=button]')) return;

			module.state.canSwipe = true;
			module.state.pointerDistance = event.screenX;
		});

		module.nodes.gallery.addEventListener('dragstart', (event) => {
			event.preventDefault();
		})

		module.nodes.gallery.addEventListener('pointerup', (event) => {
			if (!module.state.canSwipe) return;

			module.state.canSwipe = false;
			const swipe = getSwipeData(event, module);

			if (!swipe.valid) return;
			if (module.state.currentIndex === 0 && swipe.direction === 'prev') return;
			if (module.state.currentIndex === module.data.lastIndex && swipe.direction === 'next') return;

			const index = swipe.direction === 'prev' ?
				module.state.currentIndex - 1 : module.state.currentIndex + 1;
			const item = module.data.images.find((item) => item.index === index);

			updateImageView(item, module);

			if (module.state.hasButtons) {
				updateStepButtons(module);
			}

			if (module.state.hasSummary) {
				updateSummary(module);
			}
		});
	}

	if (module.emitter !== null) {
		module.emitter.add(`image-viewer/${module.id}:can-update`, (args) => {
			updateKeydownGate(module, args);
		});
	}

	if (module.functions.canUpdate !== null) {
		module.functions?.canUpdate();
	}
}

export default addEvents;
