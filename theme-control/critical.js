/*
 * Functions and initial theme application is a slight duplicate to prevent style-flash 
 * problems. Use in <head> as critical js.
 */
(function() {
	let theme = localStorage.getItem('theme');

	if (theme !== null) {
		document.documentElement.setAttribute('data-theme', theme);
	} else {
		theme = 'light';

		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme = 'dark';
		}
		
		document.documentElement.setAttribute('data-theme', theme);
	}
})();