/**
 * 
 * @param {'localStorage' | 'sessionStorage'} type 
 */

function storageAvailable(type) {
	try {
		const storage = window[type];
		const testString = '__storageTest__';

		storage.setItem(testString, testString);
		storage.removeItem(testString);
		return true;
	} catch(error) {
		console.error('storageAvailable:', error);
		return false;
	}
}

export default storageAvailable;