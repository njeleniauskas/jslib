import resetChildFocus from '../../composite-element/library/reset-child-focus.js';
import getContextChildren from './get-context-children.js';

function resetToComponent(module) {
	let children = module.state.nodes.children;

	if (children === null) {
		children = getContextChildren({
			context: module.nodes.collection,
			attribute: module.props.attributes.child,
			value: module.id
		});
	}

	resetChildFocus({
		component: module.nodes.component,
		children: children,
		targetChild: null,
		navigationType: module.props.navigationType,
		attributes: {
			childFocus: module.props.attributes.childFocus,
			activeDescendant: module.props.attributes.activeDescendant,
		},
	});

	if (module.props.disclosable) {
		module.nodes.component.setAttribute(module.props.attributes.expanded, 'false');
		module.nodes.collection.setAttribute(module.props.attributes.hidden, 'true');
	}

	module.nodes.component.setAttribute(module.props.attributes.activeDescendant, '');

	module.processNavigationContext('attribute', {
		contexts: module.nodes.contexts,
		attribute: module.props.attributes.contextRole,
		value: 'component'
	});
}

export default resetToComponent;
