function getTargetIndex({ children, pointerEventChild }) {
	if (pointerEventChild !== null) {
		return children.indexOf(pointerEventChild);
	}

	return children.findIndex((element) => element.getAttribute('data-selected') === 'true');
};

export default getTargetIndex;
