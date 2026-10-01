import getContextChildren from './get-context-children.js';
import handleFocusedChild from './handle-focused-child.js';

function focusTargetReleased(params) {
	const { module, eventType, children, targetChild } = params;

	if (eventType === 'click') {
		const args = {
			children: children,
			targetChild: targetChild,
		};

		if (children == null) {
			args.children = getContextChildren({
				context: module.nodes.listbox,
				attribute: module.props.attributes.child,
				value: module.id
			});
		}

		handleFocusedChild(module, args);
	}
}



export default focusTargetReleased;
