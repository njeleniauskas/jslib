function getTargetIndex({ children, pointerEventChild, attributes }) {
	if (pointerEventChild !== null) {
		return children.indexOf(pointerEventChild);
	}

	return children.findIndex((element) => element.getAttribute(attributes.selected) === 'true');
};

export default getTargetIndex;
