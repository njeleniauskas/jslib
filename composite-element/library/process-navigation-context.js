import getNavigationContext from '../../common/composite-navigation/get-navigation-context.js';
import setNavigationContext from './set-navigation-context.js';

function processNavigationContext(module, type, params) {
	const context = getNavigationContext(module, type, params);

	setNavigationContext(module, context);
}

export default processNavigationContext;
