import getNextTheme from './get-next-theme.js';
import setTheme from './set-theme.js';

function addEvents(module) {
	module.controls.forEach((control) => {
		control.addEventListener('click', (e) => {
			let theme;

			if (e.currentTarget.hasAttribute(module.props.strings.multiState)) {
				theme = getNextTheme(module.props.themes, e.currentTarget.getAttribute(module.props.strings.control));
			} else {
				theme = e.currentTarget.getAttribute(module.props.strings.control);
			}

			setTheme(module, theme);
		});
	});
}

export default addEvents;