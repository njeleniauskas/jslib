import updateFocusState from '../../composite-element/library/update-focus-state.js';
import processSelectionMatch from './process-selection-match.js';
import listboxHasChildren from './listbox-has-children.js';

function processComboboxState(event, module) {
	if (module.props.preseed) {
		module.props.preseed = false;
		return;
	}

	if (module.props.searchMutatesChildren && module.state.nodes.context === module.nodes.listbox) {
		const nameBeforeMutation = module.state.childNameBeforeMutation;
		module.state.childNameBeforeMutation = null;

		if (!listboxHasChildren(module)) {
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
			value: 'listbox'
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
		module.nodes.listbox.setAttribute(module.props.attributes.display, 'false');
	}
}

export default processComboboxState;
