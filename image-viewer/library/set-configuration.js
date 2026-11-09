function setConfiguration(module, params) {
	if (!('id' in params)) {
		throw new Error('An ID is required.');
	}

	module.id = params.id;

	const strings = 'strings' in params ? params.strings : {};

	module.props.strings.viewer = 'viewer' in strings ?
		strings.viewer : `[data-iv-viewer="${module.id}"]`;
	module.props.strings.gallery = 'gallery' in strings ?
		strings.gallery : `[data-iv-gallery="${module.id}"]`;
	module.props.strings.image = 'image' in strings ?
		strings.image : `[data-iv-image="${module.id}"]`;

	module.props.strings.imageSrc = 'imageSrc' in strings ?
		strings.imageSrc : '{file}';
	module.props.strings.thumbnailSrc = 'thumbnailSrc' in strings ?
		strings.thumbnailSrc : '{file}-thumb';

	module.props.strings.imageControl = 'imageControl' in strings ?
		strings.imageControl : `[data-iv-control="${module.id}"]`;
	module.props.strings.buttonPrev = 'buttonPrev' in strings ?
		strings.buttonPrev : `[data-iv-prev="${module.id}"]`;
	module.props.strings.buttonNext = 'buttonNext' in strings ?
		strings.buttonNext : `[data-iv-next="${module.id}"]`;
	module.props.strings.disabled = 'disabled' in strings ?
		strings.disabled : 'data-disabled';
	module.props.strings.summary = 'summary' in strings ?
		strings.summary : `[data-iv-summary="${module.id}"]`;

	module.props.type = 'type' in params ?
		params.type : 'static';
	module.props.display = 'display' in params ?
		params.display : 'single';

	module.props.distanceThreshold = 0.1;

	const functions = 'functions' in params ? params.functions : {};

	module.functions.template = 'template' in functions ?
		functions.template : null;
	module.functions.canUpdate = 'canUpdate' in functions ?
		functions.canUpdate : null;

	module.emitter = 'emitter' in params ?
		params.emitter : null;
}

export default setConfiguration;
