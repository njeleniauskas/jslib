const createState = () => {
	return {
		nodes: {
			context: null,
			lastContext: null,
			parent: null,
			children: null,

			focusedChild: null,
			lastFocusedChild: null,

			pointerEventChild: null,
		},

		isKeyEvent: false,
		isPointerEvent: false,
		clickEscapesContext: false,
		isInitial: true,

		language: {
			direction: null,
			writingMode: null
		},
		eventKey: null,
		navigationKeys: null,
		orientation: null,
	};
};

export default createState;
