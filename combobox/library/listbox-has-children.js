function listboxHasChildren(module) {
	return module.nodes.listbox.querySelector(`[${module.props.attributes.child}="${module.id}"]`) !== null;
}

export default listboxHasChildren;
