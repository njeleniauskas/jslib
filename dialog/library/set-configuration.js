function setConfiguration(module, params) {
	if (!('id' in params) && !('attributes' in params)) {
		throw new Error('An ID must exist when not passing in attribute args.');
	}

	module.id = params.id;

	const strings = 'strings' in params ? params.strings : {};

	module.props.strings.control = 'control' in strings ?
		strings.control : `[data-dialog-control="${module.id}"]`;
	module.props.strings.dialog = 'dialog' in strings ?
		strings.dialog : `[data-dialog="${module.id}"]`;
	module.props.strings.close = 'close' in strings ?
		strings.close : `[data-dialog-close="${module.id}"]`;

	module.props.strings.hidden = 'hidden' in strings ?
		strings.hidden : 'data-hidden';

	module.props.strings.transitionIn = 'transitionIn' in strings ?
		strings.transitionIn : 'is-visible';
	module.props.strings.transitionOut = 'transitionOut' in strings ?
		strings.transitionOut : 'is-closing';

	module.props.isModal = 'isModal' in params ?
		params.isModal : true;
	module.props.startOpen = 'startOpen' in params ?
		params.startOpen : false;

	const functions = 'functions' in params ? params.functions : {};

	module.functions.dialogOpened = 'dialogOpened' in functions ?
		functions.dialogOpened : null;
	module.functions.dialogClosed = 'dialogClosed' in functions ?
		functions.dialogClosed : null;

	if (!('id' in params) && 'emitter' in params) {
		throw new Error('An ID must exist when an emitter is used.');
	}

	module.emitter = 'emitter' in params ?
		params.emitter : null;
}

export default setConfiguration;
