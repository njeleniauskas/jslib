const state = {
	navigation: {
		context: null,
		parent: null,
		children: null,
		focusedChild: null,
		lastFocusedChild: null,
	},

	isKeyEvent: false,
	isPointerEvent: false,
	clickEscapesContext: false,
	isInitial: true,

	language: {
		direction: null,
		writingMode: null
	},
	navigationKeys: null,
	orientation: null,
}

export default state;