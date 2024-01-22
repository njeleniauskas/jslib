import props from '../data/props.js';
import data from '../data/data.js';

function updateViewState(targetValue) {	
	data.nodes.views.forEach((view) => {
		const viewID = view.getAttribute(props.attributes.viewID);
		
		if (viewID === targetValue) {
			view.setAttribute(props.attributes.display, 'false');
		} else {
			view.setAttribute(props.attributes.display, 'true');
		}
	});
}

export default updateViewState;