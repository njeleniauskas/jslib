/**
 * 
 * @param {object} module 
 * @param {object} DataCollection 
 */

function connectDataCollection(module, DataCollection) {
	module.data = DataCollection.data;
	module.props.name = DataCollection.props.name;
	module.state.displaySize = module.data.live.length;
}

export default connectDataCollection;