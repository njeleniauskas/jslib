import props from '../data/props.js';
import data from '../data/data.js';
import state from '../data/state.js';

import isFocusAttributePresentAndTrue from '../../common/composite-navigation/is-focus-attribute-present-and-true.js';
import resetFocusState from './reset-focus-state.js';

/**
 * @param {event} event - The focusout event.
 */

function handleFocusoutEvent(event) {
	let contextSelector = `[${props.attributes.context}="${props.id}"]`;
	let isOutsideContext;
	let isReferenceFocusAttributeTrue;

	if (state.isKeyEvent && event.relatedTarget === null) {
		isReferenceFocusAttributeTrue = isFocusAttributePresentAndTrue({
			'attribute': props.attributes.referenceFocus,
			'node': data.nodes.reference
		});

		if (isReferenceFocusAttributeTrue === true) {
			data.nodes.reference.setAttribute(props.attributes.referenceFocus, 'false');
		}

		if (state.navigation.focusedChild !== null && props.navigationType === 'activedescendant') {
			state.navigation.focusedChild.setAttribute(props.attributes.childFocus, 'false');
		}
	}
	
	if (state.isKeyEvent && event.relatedTarget !== null) {
		isOutsideContext = event.relatedTarget.closest(contextSelector);
		
		if (isOutsideContext === null) {
			resetFocusState();

			state.clickEscapesContext = false;
			state.navigation.lastFocusedChild = null;
			state.navigation.focusedChild = null;
			state.isInitial = true;
		}
	}
	
	state.clickEscapesContext = (event.relatedTarget === null);
}

export default handleFocusoutEvent;