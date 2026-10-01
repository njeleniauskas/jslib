import updateFocusState from '../../composite-element/library/update-focus-state.js';
import processSelectionMatch from './process-selection-match.js';

function processComboboxState(event, module) {
	if (module.props.preseed) {
		module.props.preseed = false;
		return;
	}

	if (module.props.searchMutatesChildren && module.state.nodes.context === module.nodes.listbox) {
		module.processNavigationContext('attribute', {
			contexts: module.nodes.contexts,
			attribute: module.props.attributes.contextRole,
			value: 'listbox'
		});

		const child = module.state.nodes.children.find((child) => child.getAttribute(module.props.attributes.childName) === module.state.childNameBeforeMutation);

		module.state.nodes.focusedChild = child;
		module.state.childNameBeforeMutation = null;
		updateFocusState(module.state.nodes.children.indexOf(module.state.nodes.focusedChild), module);
	}

	if (module.props.selectable && module.props.selectBehavior === 'coupled') {
		processSelectionMatch(module);
	}

	if (module.props.disclosable) {
		module.nodes.listbox.setAttribute(module.props.attributes.display, 'false');
	}
}

export default processComboboxState;
