/**
 * 
 * @param {object} module 
 * @param {object} DataCollection 
 */

function connectDataCollection(module, DataCollection) {
	if (module.id === DataCollection.id && module.data === null) {
		module.data = DataCollection.data;
		module.props.name = DataCollection.props.name;
		module.state.displaySize = module.data.live.length;
	}
}

export default connectDataCollection;