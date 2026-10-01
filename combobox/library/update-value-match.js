function updateValueMatch(params) {
	const { component, children, attributes } = params;
	const value = component.value.toLowerCase().trim();

	children.forEach((child) => {
		const matches = child.getAttribute(attributes.childName).toLowerCase() === value;

		child.toggleAttribute(attributes.valueMatch, matches);
	});
}

export default updateValueMatch;
