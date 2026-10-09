import getContextChildren from './get-context-children.js';
import updateValueMatch from './update-value-match.js';

function processSelectionMatch(module) {
	let children = module.state.nodes.children;

	if (children === null) {
		children = getContextChildren({
			context: module.nodes.collection,
			attribute: module.props.attributes.child,
			value: module.id
		});
	}

	if (children.length !== 0) {
		updateValueMatch({
			component: module.nodes.component,
			children: children,
			attributes: {
				childName: module.props.attributes.childName,
				valueMatch: module.props.attributes.valueMatch
			}
		});
	}
}

export default processSelectionMatch;
