function getTargetIndex({ children, pointerEventChild, attributes }) {
	if (pointerEventChild !== null) {
		return children.indexOf(pointerEventChild);
	}

	return children.findIndex((element) => element.getAttribute(attributes.selection) === 'true');
};

export default getTargetIndex;
