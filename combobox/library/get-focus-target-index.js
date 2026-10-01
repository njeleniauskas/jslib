import inArray from '../../common/utilities/in-array.js';

const strategies = {
	query: (module, params) => {
		const queryMatch = getQueryMatch(module, params);

		if (queryMatch !== null) {
			return queryMatch;
		}

		return 0;
	},
	key: (module, params) => {
		const queryMatch = getQueryMatch(module, params);

		if (queryMatch !== null) {
			return queryMatch;
		}

		const key = params.key;
		const keys = module.state.navigationKeys.cross;
		const isPrev = inArray(keys.prev, key);

		if (isPrev) {
			return params.children.length - 1;
		}

		return 0;
	}
}

function getFocusTargetIndex(type, module, params) {
	const process = strategies[type];

	return process(module, params);
}

function getQueryMatch(module, params) {
	const value = module.nodes.component.value.toLowerCase().trim();

	if (value !== '') {
		const attribute = module.props.attributes.childName;
		const matchingChild = params.children.find((child) => child.getAttribute(attribute).toLowerCase() === value);

		if (matchingChild) {
			return params.children.indexOf(matchingChild);
		}
	}

	return null;
}

export default getFocusTargetIndex;
