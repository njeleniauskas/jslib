function collectionHasChildren(module) {
	return module.nodes.collection.querySelector(`[${module.props.attributes.child}="${module.id}"]`) !== null;
}

export default collectionHasChildren;
