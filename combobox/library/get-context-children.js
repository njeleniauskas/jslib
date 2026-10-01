function getContextChildren(params) {
	const { context, attribute, value } = params;
	const selector = `[${attribute}="${value}"]`;

	return [...context.querySelectorAll(selector)];
}

export default getContextChildren;
