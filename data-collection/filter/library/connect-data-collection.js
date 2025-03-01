/**
 * 
 * @param {object} module 
 * @param {object} DataCollection 
 */

function connectDataCollection(module, DataCollection) {
	if (module.id === DataCollection.id && module.data === null) {
		module.data = DataCollection.data;
	}
}

export default connectDataCollection;