//import attributeStateByValue from '../../common/utilities/attribute-state-by-value.js';

import filterStateEmpty from './filter-state-empty.js';

/**
 * Checks whether the reset node should be flagged (or not).
 * @param {object} params 
 * @param {object} resetNodes 
 * @param {boolean} params.multiSelection 
 * @param {boolean} params.hasReset 
 * @param {boolean} params.resetByValue 
 * @param {boolean} params.resetVisibilityValue 
 * @param {object} params.filter 
 * @param {string} params.pointerVisibility - the pointerVisibility used for the state of the reset node.
 * @param {string} params.pointerChange - the pointer used for the state of the reset node.
 * @returns boolean
 */

function getResetNodeConditions(params) {
	if (params.multiSelection && params.hasReset) {
		const resetNode = params.nodes.reset;
		const filterEmpty = filterStateEmpty(params.filter);
		let flagged;

		if (params.resetByValue) {
			let value = JSON.stringify(params.resetVisibilityValue);

			flagged = (resetNode.getAttribute(params.pointerVisibility) === value);
		} else {
			flagged = resetNode.hasAttribute(params.pointerVisibility);
		}

		if (!filterEmpty && !flagged || filterEmpty && flagged) {

			return true;
		}
	}

	return false;
}

export default getResetNodeConditions;