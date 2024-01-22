/**
 * Update the filter module object from a FilterGroup component.
 * @param {object} filters - The filters object.
 * @param {object} filterGroup - The filter group to update.
 */

function updateFilterGroup(filters, filterGroup) {
	for (const [key, value] of Object.entries(filterGroup)) {
		if (!filters.hasOwnProperty(key)) {
			filters[key] = [];
		}
		
		if (filters.hasOwnProperty(key)) {
			if (value !== null) {
				filters[key] = value;
			} else {
				Reflect.deleteProperty(filters, key);
			}
		}
	}
}

export default updateFilterGroup;	