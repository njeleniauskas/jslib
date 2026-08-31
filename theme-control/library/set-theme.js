import storageAvailable from '../../common/utilities/storage-available.js';

function setTheme(module, theme) {
	module.controls.forEach((control) => {
		const isMultiState = control.hasAttribute(module.props.strings.multiState);
		if (isMultiState) {
			const name = control.querySelector(`[${module.props.strings.controlState}]`);
			
			control.setAttribute(module.props.strings.control, theme);
			name.textContent = theme;
		}
	});

	window.setTimeout(() => {
		document.documentElement.setAttribute(module.props.strings.root, theme);

		if (storageAvailable('localStorage')) {
			localStorage.setItem('theme', theme);
		}
	}, module.props.delay);
}

export default setTheme;