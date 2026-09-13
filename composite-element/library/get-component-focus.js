import isFocusAttributePresentAndTrue from '../../common/composite-navigation/is-focus-attribute-present-and-true.js';

function getComponentFocus(component, attribute) {
	if (component === document.activeElement) {
		return true;
	}

	return isFocusAttributePresentAndTrue({
		'node': component,
		'attribute': attribute,
	});
}

export default getComponentFocus;
