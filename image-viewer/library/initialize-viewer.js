async function initializeViewer(module) {
	if (module.props.type === 'dynamic') {
		await buildComponent(module);
	}

	getNodes(module);
	setState(module);
	getImageData(module);
}

async function buildComponent(module) {
	module.nodes.viewer = document.querySelector(module.props.strings.viewer);

	const template = await module.functions.template({
		strings: module.props.strings
	});

	module.nodes.viewer.appendChild(template);
}

function getNodes(module) {
	const strings = module.props.strings;

	module.nodes.viewer = document.querySelector(strings.viewer);
	module.nodes.gallery = document.querySelector(strings.gallery);
	module.nodes.image = [...document.querySelectorAll(strings.image)];
	module.nodes.imageControl = [...document.querySelectorAll(strings.imageControl)];

	module.nodes.summary = document.querySelector(strings.summary);

	module.nodes.buttonPrev = document.querySelector(strings.buttonPrev);
	module.nodes.buttonNext = document.querySelector(strings.buttonNext);
};

function setState(module) {
	if (module.nodes.summary !== null) {
		module.state.hasSummary = true;
	}

	if (module.nodes.buttonPrev !== null) {
		module.state.hasButtons = true;
		module.state.canSwipe = true;
	}

	if (module.state.hasButtons) {
		const strings = module.props.strings;

		if (module.nodes.image.length < 2) {
			module.nodes.buttonPrev.setAttribute(strings.disabled, 'true');
			module.nodes.buttonNext.setAttribute(strings.disabled, 'true');
		};

		if (module.nodes.image.length === 2) {
			module.nodes.buttonPrev.setAttribute(strings.disabled, 'true');
		}
	}
}

function getImageData(module) {
	module.nodes.imageControl.forEach((control) => {
		const src = control.getAttribute('data-src');
		const alt = control.getAttribute('data-alt');

		if (!module.data.images.some((item) => item.src === src)) {
			module.data.images.push({
				src: src,
				alt: alt,
				index: module.data.images.length
			});
		}
	});

	module.data.lastIndex = module.data.images.length - 1;
}

export default initializeViewer;
