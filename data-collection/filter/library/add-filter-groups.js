/**
 * 
 * @param {object} module - The filter module.
 * @param {object} params - Params passed from a FilterGroup component.
 */

function addFilterGroups(module, params) {
	const keys = params.split(' ').filter(Boolean);

	if (keys.length > 1) {
		keys.forEach((rawKey) => {
			const key = rawKey.trim();

			if (!(key in module.state.groupedKeys)) {
				module.state.groupedKeys[key] = [];
			}

			keys.forEach((item) => {
				if (!module.state.groupedKeys[key].some(index => index === item)) {
					module.state.groupedKeys[key].push(item);
				}
			});
		});
	}
}

export default addFilterGroups;