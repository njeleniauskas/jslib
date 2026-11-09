import formatSrc from './format-src.js';

const updateFunction = {
	single: (item, module) => {
		module.nodes.image[0].src = formatSrc(
			item.src,
			module.props.strings.imageSrc
		);

		module.nodes.image[0].alt = item.alt
	},
	multiple: (item, module) => {
		//stub: for multiple-image display in viewer
	}
};

function updateImageView(item, module) {
	updateFunction[module.props.display](item, module);
	module.state.currentIndex = item.index;

	module.emitter?.emit(`image-viewer/${module.id}:view-updated`, {
		src: item.src,
		index: item.index,
	});
}

export default updateImageView;
