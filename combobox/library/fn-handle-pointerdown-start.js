import processSelection from './process-selection.js';

function handlePointerdownStart(params) {
	const { event, module } = params;
	const queryString = `[${module.props.attributes.child}="${module.id}"]`;
	module.state.nodes.pointerEventChild = event.target.closest(queryString);

	if (module.state.nodes.pointerEventChild !== null ||
		event.target === module.nodes.collection && document.activeElement === module.nodes.component) {
		event.preventDefault();
	}

	if (module.state.nodes.pointerEventChild !== null
		&& module.state.isInitial
		&& !module.props.disclosable) {
		module.processNavigationContext('attribute', {
			contexts: module.nodes.contexts,
			attribute: module.props.attributes.contextRole,
			value: 'collection'
		});

		if (module.props.selectable) {
			const targetIndex = module.state.nodes.children.indexOf(module.state.nodes.pointerEventChild);

			processSelection(module, {
				targetChild: module.state.nodes.children[targetIndex],
				children: module.state.nodes.children
			});
		}

		if (document.activeElement !== module.nodes.component) {
			module.nodes.component.focus();
		}

		//re-establish collection context
		if (!module.props.returnFocusToComponent) {
			module.processNavigationContext('attribute', {
				contexts: module.nodes.contexts,
				attribute: module.props.attributes.contextRole,
				value: 'collection'
			});
		}

		return;
	}

	if (module.state.nodes.pointerEventChild !== null
		&& !module.state.isInitial
		&& !module.props.returnFocusToComponent) {
		module.processNavigationContext('attribute', {
			contexts: module.nodes.contexts,
			attribute: module.props.attributes.contextRole,
			value: 'collection'
		});
	}

	if (event.target === module.state.nodes.context && module.props.disclosable) {
		const attribute = module.props.attributes.hidden;

		if (module.nodes.collection.getAttribute(attribute) === 'true') {
			module.nodes.component.setAttribute(module.props.attributes.expanded, 'true');
			module.nodes.collection.setAttribute(attribute, 'false');
		}
	}
}

export default handlePointerdownStart;
