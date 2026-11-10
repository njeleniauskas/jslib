import setConfiguration from './library/set-configuration.js';
import initializeDialog from './library/initialize-dialog.js';
import addEvents from './library/add-events.js';

/**
 * @param {object} params
 * @param {string} [params.id] - The id of the component.
 *
 * @param {object} [params.strings]
 * @param {string} [params.strings.control] - Identifies control nodes.
 * @param {string} [params.strings.dialog] - Identifies the dialog node.
 * @param {string} [params.strings.close] - Identifies close nodes.
 * @param {string} [params.strings.hidden] - The data attribue that identifies the dialog as visible or hidden.
 * @param {string} [params.strings.transitionIn] - The class for the opening transition.
 * @param {string} [params.strings.transitionOut] - The class for the closing transition.
 *
 * @param {boolean} params.isModal - Whether the dialog should behave as a modal or non-modal dialog.
 * @param {boolean} params.startOpen - Should the dialog start opened or not.
 * @param {boolean} [params.emitter] - The event emitter class.
 */

class Dialog {
	constructor(params) {
		this.id = null;
		this.props = {
			strings: {
				control: null,
				dialog: null,
				close: null,
				hidden: null,
				transitionIn: null,
				transitionOut: null,
			},
			isModal: null,
			startOpen: null,
		};
		this.nodes = {
			control: null,
			dialog: null,
			close: null
		};
		this.functions = {
			dialogOpened: null,
			dialogClosed: null,
		};
		this.emitter = null;
		this.state = {
			returnElement: null,
			pointerOriginInside: false,
		};

		this.#init(params);
	}

	#init(params) {
		try {
			setConfiguration(this, params);
			initializeDialog(this);
			addEvents(this);
		} catch (errors) {
			if (errors instanceof AggregateError) {
				console.error(errors.message)

				for (const error of errors.errors) {
					console.error(error.message);
				}
			} else {
				console.error(errors);
			}
		}
	}
}

export default Dialog;
