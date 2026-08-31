import storageAvailable from '../../common/utilities/storage-available.js';

function getSystemThemePreference() {
	let theme = 'light';

	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		theme = 'dark';
	}
	
	return theme;
}

function getTheme() {
	let theme; 

	if (!storageAvailable('localStorage') || 
		storageAvailable('localStorage') && localStorage.getItem('theme') === null) {
		theme = getSystemThemePreference();
	} 
	
	if (storageAvailable('localStorage') && localStorage.getItem('theme') !== null) {
		theme = localStorage.getItem('theme');
	}

	return theme;
}

export default getTheme;