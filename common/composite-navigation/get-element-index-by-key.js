import numberWithinRange from '../utilities/number-within-range.js';
import inArray from '../utilities/in-array.js';

/**
 * Get the index of an element by the key pressed.
 * @param {Object} params
 * @param {string} params.key - The event.key pressed.
 * @param {array} params.elements - The elements being evaluated.
 * @param {Object} params.focusedElement - The element currently in focus.
 * @param {Object} params.navigationKeys - The keys used for main-axis navigation.
 * @returns {number}
 */

function getElementIndexByKey(params) {
	const key = params.key;
	const elements = params.elements;
	const focusedElement = params.focusedElement;
	const keysNext = params.navigationKeys.next;

	const currentIndex = elements.indexOf(focusedElement);
	const lastIndex = elements.length - 1;
	const range = [0, lastIndex];

	//unconfirmed if still useful
	if (focusedElement === null) {
		if (inArray(keysNext, key)) {
			return 0;
		}

		return lastIndex;
	}

	let direction = 'Home';
	let furthestValue = 0;
	let targetIndex = currentIndex;

	if (inArray(keysNext, key)) {
		direction = 'End';
		furthestValue = lastIndex;
	}

	if (key === direction) {
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

export default getElementIndexByKey;
