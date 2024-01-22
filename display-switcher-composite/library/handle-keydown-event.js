import props from '../data/props.js';
import data from '../data/data.js';
import state from '../data/state.js';

import itemInArray from '../../common/utilities/item-in-array.js';

import getLanguageAndNavigationContext from '../../common/composite-navigation/get-language-and-navigation-context.js';
import getTargetElementIndexByKey from '../../common/composite-navigation/get-target-element-index-by-key.js';

import setLanguageAndNavigationData from './set-language-and-navigation-data.js';
import updateFocusState from './update-focus-state.js';

function handleKeydownEvent(event) {
	if (itemInArray(props.keys.scroll, event.key)) {
		event.preventDefault();
	}
	
	if (itemInArray(props.keys.navigation, event.key)) {
		let targetElementIndex;
		let validNavigationKeys;
		let languageAndNavigationData = getLanguageAndNavigationContext({
			'node': data.nodes.reference,
			'orientationAttribute': props.attributes.orientation
		});
		
		setLanguageAndNavigationData(languageAndNavigationData);
		
		validNavigationKeys = state.navigationKeys.prev.concat(state.navigationKeys.next);
		
		if (itemInArray(validNavigationKeys, event.key)) {
			targetElementIndex = getTargetElementIndexByKey({
				'eventKey': event.key,
				'children': state.navigation.children,
				'currentFocusedChild': state.navigation.focusedChild,
				'navigationKeysNext': state.navigationKeys.next
			});

			updateFocusState(targetElementIndex);

			state.navigation.lastFocusedChild = state.navigation.focusedChild;
			state.navigation.focusedChild = state.navigation.children[targetElementIndex];
			state.isInitial = false;
		}
	}
}

export default handleKeydownEvent;