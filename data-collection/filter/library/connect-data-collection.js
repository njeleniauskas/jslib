/**
 * 
 * @param {object} module 
 * @param {object} DataCollection 
 */

function connectDataCollection(module, DataCollection) {
	module.data = DataCollection.data;
}

export default connectDataCollection;