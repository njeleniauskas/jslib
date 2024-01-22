const props = {
	id: null,
	attributes: {
		component: null,
		reference: null,
		context: null,
		parent: null,
		child: null,

		view: null,
		controlID: null,
		viewID: null,

		//state attributes
		orientation: null,
		activeDescendant: null,
		referenceFocus: null,
		childFocus: null,
		selected: null,
		display: null,
	},

	keys: {
		navigation: ['ArrowLeft', 'ArrowUp', 'Home', 'ArrowRight', 'ArrowDown', 'End'],
		scroll: ['ArrowLeft', 'ArrowUp', 'Home', 'ArrowRight', 'ArrowDown', 'End', ' ', 'PageUp', 'PageDown'],
		selection: [' ', 'Enter'],
	},

	navigationType: null,
	selection: false,
	multiAxis: false,
};

export default props;