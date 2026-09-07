import isFocusAttributePresentAndTrue from '../../common/composite-navigation/is-focus-attribute-present-and-true.js';
import resetFocusState from './reset-focus-state.js';

/**
 * @param {event} event - The focusout event.
 * @param {class} module - The main class module.
 */

function handleFocusoutEvent(event, module) {
	let contextSelector = `[${module.props.attributes.context}="${module.props.id}"]`;
	let isOutsideContext;
	let isComponentFocusAttributeTrue;

	if (module.state.isKeyEvent && event.relatedTarget === null) {
		isComponentFocusAttributeTrue = isFocusAttributePresentAndTrue({
			'attribute': module.props.attributes.componentFocus,
			'node': module.data.nodes.component
		});

		if (isComponentFocusAttributeTrue) {
			module.data.nodes.component.setAttribute(module.props.attributes.componentFocus, 'false');

			if (module.data.nodes.component !== module.state.navigation.context) {
				module.state.navigation.context.setAttribute('data-focused', 'false');
			}
		}

		if (module.state.navigation.focusedChild !== null && module.props.navigationType === 'activedescendant') {
			module.state.navigation.focusedChild.setAttribute(module.props.attributes.childFocus, 'false');
		}
	}

	if (module.state.isKeyEvent && event.relatedTarget !== null) {
		isOutsideContext = event.relatedTarget.closest(contextSelector);

		if (isOutsideContext === null) {
			resetFocusState(module);

			module.state.clickEscapesContext = false;
			module.state.navigation.lastFocusedChild = null;
			module.state.navigation.focusedChild = null;
			module.state.isInitial = true;

			if (module.data.nodes.component !== module.state.navigation.context) {
				module.state.navigation.context.setAttribute('data-focused', 'false');
			}
		}
	}

	module.state.clickEscapesContext = (event.relatedTarget === null);
}

export default handleFocusoutEvent;
