function getNodes(params) {
	const keys = Object.keys(params);
	const results = {};

	keys.forEach((key) => {
		const selector = params[key];

		results[key] = document.querySelector(selector);
	});

	return results;
}

export default getNodes;