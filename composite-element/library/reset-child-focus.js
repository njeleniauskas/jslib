import getFocusValuesByAttribute from '../../common/composite-navigation/get-focus-values-by-attribute.js';

function resetChildFocus(params) {
	const { component, children, targetChild, navigationType, attributes } = params;
	const childStates = getFocusValuesByAttribute(attributes.childFocus);

	children.forEach((child) => {
		if (navigationType === 'roving') {
			if (child === targetChild) {
				child.setAttribute(attributes.childFocus, childStates.focus);
			} else {
				child.setAttribute(attributes.childFocus, childStates.blur);
			}
		} else {
			child.setAttribute(attributes.childFocus, childStates.blur);
		}
	});

	if (navigationType === 'reference') {
		component.setAttribute(attributes.activeDescendant, null);
	}
}

export default resetChildFocus;
