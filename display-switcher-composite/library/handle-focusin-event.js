import props from '../data/props.js';
import data from '../data/data.js';
import state from '../data/state.js';

import getTargetElementIndexByFocus from '../../common/composite-navigation/get-target-element-index-by-focus.js';
import getFocusValuesByAttribute from '../../common/composite-navigation/get-focus-values-by-attribute.js';
import updateFocusState from './update-focus-state.js';

function handleFocusinEvent() {
	if (state.isKeyEvent) {
		let targetChildIndex;
		let targetChild;
		let referenceStates;
		
		if (state.isInitial === false) {
			if (props.attributes.referenceFocus !== 'tabindex') {
				data.nodes.reference.setAttribute(props.attributes.referenceFocus, 'true');
			}

			if (props.attributes.childFocus !== 'tabindex') {
				state.navigation.focusedChild.setAttribute(props.attributes.childFocus, 'true');
			}
		}

		if (state.isInitial) {
			targetChildIndex = getTargetElementIndexByFocus({
				'selection': props.selection,
				'array': state.navigation.children,
				'selectedAttribute': props.attributes.selected,
				'childAttribute': props.attributes.child,
			});

			targetChild = state.navigation.children[targetChildIndex];

			//side-effect: adds tabindex to an element without the attribute.
			if (props.attributes.referenceFocus !== 'tabindex') {
				referenceStates = getFocusValuesByAttribute(props.attributes.referenceFocus);
				data.nodes.reference.setAttribute(props.attributes.referenceFocus, referenceStates.focus);
			}
			
			if (props.attributes.child !== 'tabindex') {
				updateFocusState(targetChildIndex);
			}

			state.navigation.lastFocusedChild = targetChild;
			state.navigation.focusedChild = targetChild;
			state.isInitial = false;
		}
	}
}

export default handleFocusinEvent;