const createProps = () => {
	return {
		attributes: {
			context: null,
			component: null,
			parent: null,
			child: null,

			//state attributes
			orientation: null,
			activeDescendant: null,
			contextRole: null,
			contextState: null,
			componentFocus: null,
			childFocus: null,
		},

		keys: {
			navigation: ['ArrowLeft', 'ArrowUp', 'Home', 'ArrowRight', 'ArrowDown', 'End'],
			scroll: ['ArrowLeft', 'ArrowUp', 'Home', 'ArrowRight', 'ArrowDown', 'End', ' ', 'PageUp', 'PageDown'],
			selection: [' ', 'Enter'],
		},

		navigationType: null,
	};
};


export default createProps;
