import itemInArray from '../../common/utilities/item-in-array.js';

import getLanguageAndNavigationContext from '../../common/composite-navigation/get-language-and-navigation-context.js';
import getTargetElementIndexByKey from '../../common/composite-navigation/get-target-element-index-by-key.js';
import setLanguageAndNavigationData from './set-language-and-navigation-data.js';
import updateFocusState from './update-focus-state.js';

/**
 * @param {event} event - The keydown event.
 * @param {class} event - The class module.
 */

function handleKeydownEvent(event, module) {
	if (itemInArray(module.props.keys.scroll, event.key)) {
		event.preventDefault();
	}

	if (itemInArray(module.props.keys.navigation, event.key)) {
		let targetElementIndex;
		let validNavigationKeys;
		let languageAndNavigationData = getLanguageAndNavigationContext({
			'node': module.data.nodes.component,
			'orientationAttribute': module.props.attributes.orientation
		});

		setLanguageAndNavigationData(languageAndNavigationData, module);

		validNavigationKeys = module.state.navigationKeys.prev.concat(module.state.navigationKeys.next);

		if (itemInArray(validNavigationKeys, event.key)) {
			targetElementIndex = getTargetElementIndexByKey({
				'eventKey': event.key,
				'children': module.state.navigation.children,
				'currentFocusedChild': module.state.navigation.focusedChild,
				'navigationKeysNext': module.state.navigationKeys.next
			});

			updateFocusState(targetElementIndex, module);

			module.state.navigation.lastFocusedChild = module.state.navigation.focusedChild;
			module.state.navigation.focusedChild = module.state.navigation.children[targetElementIndex];
			module.state.isInitial = false;
		}
	}
}

export default handleKeydownEvent;
