function getFocusableElement(index, container, attribute) {
	const children = [...container.querySelectorAll(attribute)];

	return children.at(index);
}

export default getFocusableElement;
