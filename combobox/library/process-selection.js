import updateSingleSelection from '../../common/group-selection/update-single-selection.js';
import updateValueMatch from './update-value-match.js';

function processSelection(module, params) {
	const targetChild = params.targetChild;
	let children = params.children;

	if (children === null) {
		children = getContextChildren({
			context: module.nodes.listbox,
			attribute: module.props.attributes.child,
			value: module.id
		});
	}

	if (module.props.selectBehavior === 'coupled') {
		const attribute = module.props.attributes.childName;

		module.nodes.component.value = targetChild.getAttribute(attribute);

		if (!module.props.searchable) {
			module.nodes.component.textContent = targetChild.getAttribute(attribute);
		}

		updateValueMatch({
			component: module.nodes.component,
			children: children,
			attributes: {
				childName: module.props.attributes.childName,
				valueMatch: module.props.attributes.valueMatch
			}
		});
	}

	if (module.props.selectBehavior === 'independent') {
		const isSelected = targetChild.getAttribute(module.props.attributes.selected) === 'true';

		if (!isSelected) {
			updateSingleSelection(children, {
				'targetNode': targetChild,
				'selectionAttribute': module.props.attributes.selected,
				'selectionByValue': true,
			});
		}
	}

	module.functions.selectionUpdated?.({ module, targetChild });
	module.emitter?.emit(`${module.name}/${module.id}:selection-updated`, {
		targetChild
	});
}

export default processSelection;
