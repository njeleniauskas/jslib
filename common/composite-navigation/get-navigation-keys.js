import itemInArray from '../utilities/item-in-array.js';

/**
 * Organize the correct keys for a composite element's navigation.
 * @param {Object} params
 * @param {string} params.orientation - The component's orientation.
 * @param {Object} params.languageSettings - The document's language settings.
 * @returns {Object} Organized into primary axis and axis-shifting keys.
 */

function getNavigationKeys(params) {
	const orientation = params.orientation;
	const language = params.languageSettings;
	const keys = {
		'horizontal': {
			'one': 'ArrowLeft',
			'two': 'ArrowRight'
		},
		'vertical': {
			'one': 'ArrowUp',
			'two': 'ArrowDown'
		}
	};
	const modes = {
		'vertical': ['vertical-lr', 'vertical-rl'],
		'sideways': ['sideways-lr', 'sideways-rl']
	};

	//fallback default
	let mainAxisKeys = keys.horizontal;
	let crossAxisKeys = keys.vertical;
	let keyPrev;
	let keyNext;
	let keyCrossAxisPrev;
	let keyCrossAxisNext;
	let lang = language.direction;
	let mode = language.writingMode;
	let result = {
		main: {},
		cross: {}
	};

	//set horizontal or vertical keys
	if (orientation === 'horizontal' && mode === 'horizontal-tb' ||
		orientation === 'vertical' && itemInArray(modes.vertical, mode) ||
		orientation === 'vertical' && itemInArray(modes.sideways, mode)
	) {
		mainAxisKeys = keys.horizontal;
		crossAxisKeys = keys.vertical;
	}

	if (orientation === 'vertical' && mode === 'horizontal-tb' ||
		orientation === 'horizontal' && itemInArray(modes.vertical, mode) ||
		orientation === 'horizontal' && itemInArray(modes.sideways, mode)
	) {
		mainAxisKeys = keys.vertical;
		crossAxisKeys = keys.horizontal;
	}

	keyPrev = mainAxisKeys.one;
	keyNext = mainAxisKeys.two;
	keyCrossAxisPrev = crossAxisKeys.one;
	keyCrossAxisNext = crossAxisKeys.two;

	//main axis reversal
	if (orientation === 'horizontal' && lang === 'ltr' && mode === 'sideways-lr' ||
	orientation === 'horizontal' && lang === 'rtl' && mode === 'horizontal-tb' ||
	orientation === 'horizontal' && lang === 'rtl' && mode === 'vertical-lr' ||
	orientation === 'horizontal' && lang === 'rtl' && mode === 'vertical-rl' ||
	orientation === 'horizontal' && lang === 'rtl' && mode === 'sideways-rl' ||
	orientation === 'vertical' && lang === 'ltr' && mode === 'vertical-rl' ||
	orientation === 'vertical' && lang === 'ltr' && mode === 'sideways-rl' ||
	orientation === 'vertical' && lang === 'rtl' && mode === 'vertical-rl' ||
	orientation === 'vertical' && lang === 'rtl' && mode === 'sideways-rl') {
		keyPrev = mainAxisKeys.two;
		keyNext = mainAxisKeys.one;
	}

	//cross-axis reveral
	if (orientation === 'horizontal' && lang === 'ltr' && mode === 'vertical-rl' ||
	orientation === 'horizontal' && lang === 'ltr' && mode === 'sideways-rl' ||
	orientation === 'horizontal' && lang === 'rtl' && mode === 'vertical-rl' ||
	orientation === 'horizontal' && lang === 'rtl' && mode === 'sideways-rl' ||
	orientation === 'vertical' && lang === 'ltr' && mode === 'sideways-lr' ||
	orientation === 'vertical' && lang === 'rtl' && mode === 'horizontal-tb' ||
	orientation === 'vertical' && lang === 'rtl' && mode === 'vertical-lr' ||
	orientation === 'vertical' && lang === 'rtl' && mode === 'vertical-rl' ||
	orientation === 'vertical' && lang === 'rtl' && mode === 'sideways-rl') {
		keyCrossAxisPrev = crossAxisKeys.two;
		keyCrossAxisNext = crossAxisKeys.one;
	}

	result.main.prev = [keyPrev].concat(['Home']);
	result.main.next = [keyNext].concat(['End']);
	result.cross.prev = [keyCrossAxisPrev].concat(['PageUp']);
	result.cross.next = [keyCrossAxisNext].concat(['PageDown']);

	return result;
}

export default getNavigationKeys;
