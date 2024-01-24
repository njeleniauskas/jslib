//import attributeStateByValue from '../../common/utilities/attribute-state-by-value.js';

import filterStateEmpty from './filter-state-empty.js';

/**
 * Checks whether the reset node should be flagged (or not).
 * @param {object} params 
 * @param {object} resetNodes 
 * @param {boolean} params.multiSelection 
 * @param {boolean} params.hasReset 
 * @param {object} params.filter 
 * @param {string} params.indicatorVisible
 * @returns boolean
 */

function getResetNodeConditions(params) {
	if (params.multiSelection && params.hasReset) {
		const resetNode = params.nodes.reset;
		const filterEmpty = filterStateEmpty(params.filter);
		let flagged;

		flagged = resetNode.classList.contains(params.indicatorVisible);

		if (!filterEmpty && !flagged || filterEmpty && flagged) {
			return true;
		}
	}

	return false;
}

export default getResetNodeConditions;