import numberWithinRange from '../utilities/number-within-range.js';
import itemInArray from '../utilities/item-in-array.js';

/**
 * Get the target element index by the key pressed.
 * @param {Object} params - An object containing all parameters.
 * @param {string} params.eventKey - The event.key pressed.
 * @param {array} params.children - The children being evaluated.
 * @param {Object} params.currentFocusedChild - The child element currently in focus.
 * @param {array} params.navigationKeysNext - The keys used for next navigation.
 * @returns {number}
 */

function getTargetElementIndexByKey(params) {
	const eventKey = params.eventKey;
	const children = params.children;
	const currentFocusedChild = params.currentFocusedChild;
	const navigationKeysNext = params.navigationKeysNext;
	
	const currentIndex = children.indexOf(currentFocusedChild);
	const numberOfChildren = children.length - 1;
	const range = [0, numberOfChildren];

	let direction = 'Home';
	let furthestValue = 0;
	let targetIndex = currentIndex;

	if (itemInArray(navigationKeysNext, eventKey)) {
		direction = 'End';
		furthestValue = numberOfChildren;
	}

	if (eventKey === direction) {
		targetIndex = furthestValue;
	} else {
		if (direction === 'Home') {
			targetIndex = currentIndex - 1;
		} else {
			targetIndex = currentIndex + 1;
		}

		if (!numberWithinRange(range, targetIndex)) {
			targetIndex = furthestValue;
		}
	}

	return targetIndex;
}

export default getTargetElementIndexByKey;