import attributeStateByValue from '../../common/utilities/attribute-state-by-value.js';

import filterStateEmpty from './filter-state-empty.js';

/**
 * Checks whether the reset node should be flagged (or not).
 * @param {object} params 
 * @param {object} resetNodes 
 * @param {boolean} params.multiSelection 
 * @param {boolean} params.hasReset 
 * @param {object} params.filter 
 * @param {string} params.pointer - the pointer used for the state of the reset node.
 * @param {string} params.resetType 
 * @returns boolean
 */

function getResetNodeConditions(params) {
	if (params.multiSelection && params.hasReset) {
		const resetNode = params.nodes.reset;
		const resetByValue = attributeStateByValue(params.pointer);
		const filterEmpty = filterStateEmpty(params.filter);
		let flagged;

		if (params.resetType === 'class') {
			flagged = resetNode.classList.contains(params.pointer);
		} else {
			if (resetByValue) {
				flagged = (resetNode.getAttribute(params.pointer) === 'false');
			} else {
				flagged = resetNode.hasAttribute(params.pointer);
			}
		}
		
		if (!filterEmpty && !flagged || filterEmpty && flagged) {
			return true;
		}
	}

	return false;
}

export default getResetNodeConditions;