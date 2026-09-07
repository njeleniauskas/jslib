/**
 * Configure the read-only parameters for a composite navigator. Fallback config is a roving tabindex with no ARIA.
 * @param {Object} params - An object containing all parameters.
 * @param {string} params.id - The id that defines the context of data- attributes.
 * @param {string} [params.attributes.contextNode] - The data- attribute for the navigation context node(s).
 * @param {string} [params.attributes.componentNode] - The data- attribute for the node that represents the component.
 * @param {string} [params.attributes.parentNode] - The data- attribute for the parent node.
 * @param {string} [params.attributes.childNode] - The data- attribute for child nodes.
 * @param {string} [params.attributes.eventNode] - The data- attribute for the node events will be attached to.
 * @param {string} [params.attributes.orientation] - Optional property to assign aria- string.
 * @param {string} [params.attributes.activeDescendant] -  Optional property to assign aria- string.
 * @param {string} [params.attributes.componentFocus] - String based on roving or component navigation needs.
 * @param {string} [params.attributes.childFocus] - String based on roving or component navigation needs.
 * @param {string} [params.attributes.selected] - Used to allow function to know last component selection.
 * @param {string} [params.attributes.contextState] - Used to identify which context should be used for navigation.
 * @returns {Object} Properties to overwrite global object data.
 */

function getNavigationConfig(params) {
	const attributes = params.attributes;
	const fallbackAttribute = 'data-cn';
	const props = {
		'attributes': {}
	};

	props.id  = 'id' in params ? params.id : undefined;
	props.attributes.orientation = 'orientation' in attributes ? attributes.orientation : 'data-orientation';
	props.attributes.componentFocus = 'componentFocus' in attributes ? attributes.componentFocus : 'data-focused';
	props.attributes.childFocus = 'childFocus' in attributes ? attributes.childFocus : 'tabindex';
	props.attributes.selected = 'selected' in attributes ? attributes.selected : 'data-selected';
	props.selection = 'selected' in attributes ? true : false;
	props.multiAxis = 'multiAxis' in params ? true : false;

	if (props.attributes.childFocus === 'tabindex') {
		props.navigationType = 'tabindex';
	}

	if ('activeDescendant' in attributes && props.attributes.childFocus !== 'tabindex') {
		props.navigationType = 'activedescendant';
	}

	let fallbackDescendantAttribute = null;

	if (props.navigationType === 'activedescendant') {
		fallbackDescendantAttribute = 'data-activedescendant';
	}

	props.attributes.activeDescendant = 'activeDescendant' in attributes ?
		attributes.activeDescendant : fallbackDescendantAttribute;

	props.attributes.context = 'contextNode' in attributes ?
		attributes.contextNode : 'data-cn';
	props.attributes.component = 'componentNode' in attributes ?
		attributes.componentNode : props.attributes.context;
	props.attributes.parent = 'parentNode' in attributes ?
		attributes.parentNode : props.attributes.context;
	props.attributes.child = 'childNode' in attributes ?
		attributes.childNode : 'data-cn-child';

	props.attributes.contextState = 'contextState' in attributes ?
		attributes.contextState : 'data-cn-current';

	return props;
}

export default getNavigationConfig;
