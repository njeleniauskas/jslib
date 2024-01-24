/**
 * Update the filter state. Rebuilds state.filter each time function is called.
 * @param {object} state 
 * @param {object} params
 * @param {string} params.type
 * @param {string} params.group
 * @param {array} params.nodes
 * @param {object} params.attributes
 * @param {object} params.indicators
 * @param {boolean} params.multiSelection
 * @param {boolean} params.selectionByValue
 */

function updateFilterState(state, params) {
	const result = [];
	const groups = params.group.split(' ').filter(Boolean);
	let method = '';
	let operator = '';
	let value;

	if (state.active && params.type === 'binary') {
		params.nodes.forEach((node) => {
			const isValueAndTrue = (params.selectionByValue && node.getAttribute(params.indicators.selected) === 'true');
			const isToggleAndExists = (!params.selectionByValue && node.hasAttribute(params.indicators.selected));

			if (isValueAndTrue || isToggleAndExists) {
				const values = node.getAttribute(params.attributes.control).split(' ');

				values.forEach((item) => {
					value = item.toLowerCase().trim();

					if (node.hasAttribute(params.attributes.method)) {
						method = node.getAttribute(params.attributes.method).toLowerCase().trim();
						operator = ': ';
					}
	
					result.push(method.concat(operator, value));
				});
			}
		});
	}

	if (state.active && params.type === 'input') {
		params.nodes.forEach((node) => {
			if (node.hasAttribute(params.attributes.method)) {
				value = node.value.toString().toLowerCase().trim();
				method = node.getAttribute(params.attributes.method).toLowerCase().trim();
				operator = ': ';
	
				if (value !== '') {
					result.push(method.concat(operator, value));
				}
			}
		});
	}

	groups.forEach((group) => {
		state.filter[group] = result;

		if (!state.active || result.length === 0) {
			state.filter[group] = null;
		}
	});
}

export default updateFilterState;