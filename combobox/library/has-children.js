function hasChildren(module) {
	return module.nodes.listbox.querySelector(`[${module.props.attributes.child}="${module.id}"]`) !== null;
}

export default hasChildren;
