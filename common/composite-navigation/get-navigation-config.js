/**
 * Configure the read-only parameters for composite navigation. Fallback config is a roving tabindex with no ARIA.
 * @param {Object} params
 * @param {string} params.id - The id that defines the context of attributes.
 * @param {string} [params.attributes]
 * @param {string} [params.attributes.contextNode] - The attribute for the navigation context node(s).
 * @param {string} [params.attributes.componentNode] - The attribute for the node that represents the component.
 * @param {string} [params.attributes.parentNode] - The attribute for the parent node (for dynamic generation).
 * @param {string} [params.attributes.childNode] - The attribute for child nodes.
 *
 * @param {string} [params.attributes.orientation] - Optional property to assign aria- string.
 * @param {string} [params.attributes.activeDescendant] - Optional property to assign aria- string.
 *
 * @param {string} [params.attributes.contextState] - Used to identify which context should be used for navigation.
 * @param {string} [params.attributes.componentFocus] - The attribute used for the component's focus state.
 * @param {string} [params.attributes.childFocus] - The attribute used for a child's focus state.
 * @returns {Object} Properties to overwrite global object data.
 */
function getNavigationConfig(params) {
	const attributes = (params.attributes ?? {});
	const fallbackRoot = 'data-cn';
	const props = {
		'attributes': {}
	};

	props.id = 'id' in params ?
		params.id : undefined;
	props.attributes.orientation = 'orientation' in attributes ?
		attributes.orientation : 'data-orientation';

	props.navigationType = 'navigationType' in params ?
		params.navigationType : 'roving';
	props.multiAxis = 'multiAxis' in params ?
		true : false;
	props.attributes.activeDescendant = 'activeDescendant' in attributes ?
		attributes.activeDescendant : 'data-activedescendant';

	props.attributes.componentFocus = 'componentFocus' in attributes ?
		attributes.componentFocus : 'data-focused';

	const childFocusFallback = props.navigationType === 'roving' ? 'tabindex' : 'data-focused';

	props.attributes.childFocus = 'childFocus' in attributes ?
		attributes.childFocus : childFocusFallback;

	props.attributes.context = 'contextNode' in attributes ?
		attributes.contextNode : fallbackRoot;
	props.attributes.component = 'componentNode' in attributes ?
		attributes.componentNode : props.attributes.context;
	props.attributes.parent = 'parentNode' in attributes ?
		attributes.parentNode : props.attributes.context;
	props.attributes.child = 'childNode' in attributes ?
		attributes.childNode : `${fallbackRoot}-child`;

	props.attributes.contextState = 'contextState' in attributes ?
		attributes.contextState : `${fallbackRoot}-current`;

	return props;
}

export default getNavigationConfig;
