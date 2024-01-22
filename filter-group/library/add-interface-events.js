import debounce from '../../common/utilities/debounce.js';

import handleBinaryEvent from './handle-binary-event.js';
import handleInputEvent from './handle-input-event.js';
import handleComparisonEvent from './handle-comparison-event.js';
import handleToggleEvent from './handle-toggle-event.js';

/**
 * @param {object} params 
 * @param {object} params.props 
 * @param {object} params.nodes 
 * @param {object} params.state 
 * @param {object} params.emitter 
 */

function addInterfaceEvents(params) {
	const nonInputKeys = ['Escape', 'Tab', 'ArrowRight', 'ArrowLeft', 'Home', 'End', 'PageUp', 'PageDown', 'Control', 'Alt', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'ScrollLock', 'PrintScreen', 'Pause', 'CapsLock'];
	const args = {
		'props': params.props,
		'nodes': params.nodes,
		'state': params.state,
		'emitter': params.emitter
	};

	params.nodes.control.forEach((node) => {
		if (params.props.type === 'binary') {
			node.addEventListener('click', (event) => {
				args.targetNode = node;

				handleBinaryEvent(args);
			});
		}

		if (params.props.type === 'input') {
			node.addEventListener('keyup', debounce((event) => {
				if (!nonInputKeys.some(key => key === event.key)) {
					args.targetNode = event.target;
					
					handleInputEvent(args);
				}
			}, params.props.delay));
		}
	});

	if ('comparison' in params.nodes) {
		params.nodes.comparison.addEventListener('change', (event) => {
			args.targetNode = event.target;

			handleComparisonEvent(args);
		});
	}

	if ('toggle' in params.nodes) {
		params.nodes.toggle.addEventListener('click', (event) => {
			args.targetNode = event.target;
			
			handleToggleEvent(args);
		});
	}
}

export default addInterfaceEvents;