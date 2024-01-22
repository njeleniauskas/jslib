/**
 * Configure the read-only parameters for a composite navigator. Fallback config is a roving tabindex with no ARIA.
 * @param {Object} params - An object containing all parameters.
 * @param {string} params.id - The id that defines the context of data- attributes.
 * @param {string} [params.attributes.componentNode] - The data- attribute for the component node.
 * @param {string} [params.attributes.contextNode] - The data- attribute for context nodes.
 * @param {string} [params.attributes.parentNode] - The data- attribute for the parent node.
 * @param {string} [params.attributes.childNode] - The data- attribute for child nodes.
 * @param {string} [params.attributes.eventNode] - The data- attribute for the node events will be attached to.
 * @param {string} [params.attributes.orientation] - Optional property to assign aria- string.
 * @param {string} [params.attributes.activeDescendant] -  Optional property to assign aria- string.
 * @param {string} [params.attributes.referenceFocus] - String based on roving or reference navigation needs.
 * @param {string} [params.attributes.childFocus] - String based on roving or reference navigation needs.
 * @param {string} [params.attributes.selected] - Used to allow function to know last component selection.
 * @returns {Object} Properties to overwrite global object data.
 */

function getNavigationConfig(params) {
	const attributes = params.attributes;
	const fallbackAttribute = 'data-ce';
	const props = {
		'attributes': {}
	};

	let fallbackDescendantAttribute = null;
	let fallbackParentAttribute = fallbackAttribute;

	props.id  = 'id' in params ? params.id : undefined;
	props.attributes.orientation = 'orientation' in attributes ? attributes.orientation : 'data-orientation';
	props.attributes.referenceFocus = 'referenceFocus' in attributes ? attributes.referenceFocus : 'data-focused';
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
	
	if (props.navigationType === 'activedescendant') {
		fallbackDescendantAttribute = 'data-activedescendant';
	}
	
	props.attributes.activeDescendant = 'activeDescendant' in attributes ? 
		attributes.activeDescendant : fallbackDescendantAttribute;
	
	if ('contextNode' in attributes) {
		fallbackParentAttribute = attributes.contextNode;
	}

	if ('componentNode' in attributes) {
		fallbackParentAttribute = attributes.componentNode;
	}

	props.attributes.component = 'componentNode' in attributes ? 
		attributes.componentNode : 'data-ce';
	props.attributes.reference = 'referenceNode' in attributes ? 
		attributes.referenceNode : props.attributes.component;
	props.attributes.context = 'contextNode' in attributes ? 
		attributes.contextNode : props.attributes.component;
	props.attributes.parent = 'parentNode' in attributes ? 
		attributes.parentNode : fallbackParentAttribute;
	props.attributes.child = 'childNode' in attributes ? 
		attributes.childNode : 'data-ce-child';

	return props;
}

export default getNavigationConfig;