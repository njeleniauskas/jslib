import inArray from '../../common/utilities/in-array.js';
import resetChildFocus from '../../composite-element/library/reset-child-focus.js';
import resetToComponent from './reset-to-component.js';
import handleFocusedChild from './handle-focused-child.js';
import getFocusTargetIndex from './get-focus-target-index.js';
import getContextChildren from './get-context-children.js';

function handleKeydownStart(params) {
	const { event, module, keydownState } = params;

	if (inArray(module.state.navigationKeys.all, event.key)) {
		handleNavigationKey(event, module, keydownState);
		return;
	}

	if (event.key === 'Enter') {
		handleSelectionKey(event, module);
		return;
	}

	if (event.key === 'Escape') {
		handleEscapeKey(event, module);
		return;
	}
}


function handleNavigationKey(event, module, keydownState) {
	const contextRole = module.state.nodes.context.getAttribute(module.props.attributes.contextRole);

	if (event.shiftKey) {
		module.state.allowShiftNavigation = false;
	} else {
		module.state.allowShiftNavigation = true;
	}

	if (contextRole !== 'component'
		&& inArray(module.state.navigationKeys.main.all, event.key)
		&& !event.shiftKey) {
		event.preventDefault();
	}

	if (contextRole === 'component'
		&& inArray(module.state.navigationKeys.cross.all, event.key)) {
		const children = getContextChildren({
			context: module.nodes.listbox,
			attribute: module.props.attributes.child,
			value: module.id
		});

		if (children.length !== 0) {
			keydownState.targetIndex = getFocusTargetIndex('key', module, { key: event.key, children });

			module.processNavigationContext('attribute', {
				contexts: module.nodes.contexts,
				attribute: module.props.attributes.contextRole,
				value: 'listbox'
			});
		}
	}
}

function handleSelectionKey(event, module) {
	if (module.state.nodes.focusedChild !== null) {
		handleFocusedChild(module, {
			targetChild: module.state.nodes.focusedChild,
			children: module.state.nodes.children
		});
	}
}

const escapeFunction = {
	hardReset: resetToComponent,
	softReset: (module) => {
		resetChildFocus({
			component: module.nodes.component,
			children: module.state.nodes.children,
			targetChild: null,
			navigationType: module.props.navigationType,
			attributes: {
				childFocus: module.props.attributes.childFocus,
				activeDescendant: module.props.attributes.activeDescendant,
			},
		});

		module.processNavigationContext('attribute', {
			contexts: module.nodes.contexts,
			attribute: module.props.attributes.contextRole,
			value: 'component'
		});
	},
	none: () => null
};

function handleEscapeKey(event, module) {
	const role = module.props.attributes.contextRole;
	let key = 'none';

	if (module.state.nodes.context.getAttribute(role) === 'component'
		&& module.props.disclosable
		&& module.nodes.listbox.getAttribute(module.props.attributes.display) === 'false') {
		key = 'hardReset';
	}

	if (module.state.nodes.context.getAttribute(role) === 'listbox') {
		key = 'hardReset';
	}

	if (!module.props.disclosable) {
		key = 'softReset';
	}

	if (module.props.searchable && module.nodes.component.getAttribute('type') === 'search') {
		event.preventDefault();
	}

	escapeFunction[key](module);
}

export default handleKeydownStart;
