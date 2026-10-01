import processComboboxState from './process-combobox-state.js';
import handleInputEvent from './handle-input-event.js';
import debounce from '../../common/utilities/debounce.js';

function addEvents(module) {
	const debouncedQuery = debounce((event, module) => {
		module.functions.query(event, module);
	},	module.props.searchDelay);

	module.nodes.component.addEventListener(
		'compositionstart',
		() => { module.state.isComposing = true; }
	);

	module.nodes.component.addEventListener(
		'input',
		(event) => {
			if (module.state.isComposing && event.isComposing) return;
			handleInputEvent(event, module, debouncedQuery)
		}
	);

	module.nodes.component.addEventListener(
		'compositionend',
		(event) => {
			module.state.isComposing = false;
			handleInputEvent(event, module, debouncedQuery)
		}
	);

	if (module.emitter !== null) {
		module.emitter.add(`${module.name}/${module.id}:query-function-end`, (args) => {
			processComboboxState(null, module);
		});
	}
}

export default addEvents;
