import updateFocusState from '../../composite-element/library/update-focus-state.js';
import processSelectionMatch from './process-selection-match.js';
import collectionHasChildren from './collection-has-children.js';

function processComboboxState(event, module) {
	if (module.props.preseed) {
		module.props.preseed = false;
		return;
	}

	if (module.props.searchMutatesChildren && module.state.nodes.context === module.nodes.collection) {
		const nameBeforeMutation = module.state.childNameBeforeMutation;
		module.state.childNameBeforeMutation = null;

		if (!collectionHasChildren(module)) {
			module.processNavigationContext('attribute', {
				contexts: module.nodes.contexts,
				attribute: module.props.attributes.contextRole,
				value: 'component'
			});

			return;
		}

		module.processNavigationContext('attribute', {
			contexts: module.nodes.contexts,
			attribute: module.props.attributes.contextRole,
			value: 'collection'
		});

		const targetIndex = module.state.nodes.children.findIndex((child) => child.getAttribute(module.props.attributes.childName) === nameBeforeMutation);

		if (targetIndex === -1) {
			module.processNavigationContext('attribute', {
				contexts: module.nodes.contexts,
				attribute: module.props.attributes.contextRole,
				value: 'component'
			});

			return;
		}

		module.state.nodes.focusedChild = module.state.nodes.children[targetIndex];

		updateFocusState(targetIndex, module);
	}

	if (module.props.selectable && module.props.selectBehavior === 'coupled') {
		processSelectionMatch(module);
	}

	if (module.props.disclosable) {
		module.nodes.component.setAttribute(module.props.attributes.expanded, 'true');
		module.nodes.collection.setAttribute(module.props.attributes.hidden, 'false');
	}
}

export default processComboboxState;
