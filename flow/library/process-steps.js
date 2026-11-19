const processStep = {
	string: (step, module) => {
		getStepNodes(step, module);
	},

	template: (step, module) => {
		const template = document.createElement('template');
		template.innerHTML = step.config.reference;
		const nodes = [...template.content.children];

		nodes.forEach((node) => {
			module.nodes.flow.appendChild(node);

			if (node.hasAttribute(module.props.strings.step)) {
				getStepNodes(step, module, node);
			}
		});
	},

	collection: (step, module) => {
		step.container = step.config.reference.container;
		step.children = step.config.reference.children;

		module.nodes.flow.appendChild(step.container);
	}
};

const types = {
	id: {
		string: value => typeof value === 'string',
	},
	template: {
		template: value => typeof value === 'string',
		collection: value => typeof value === 'object' && !Array.isArray(value)
	}
};


function processSteps(module) {
	for (const [name, entry] of Object.entries(module.steps)) {
		const type = getType(types, entry);

		if (typeof type !== 'string') {
			throw new Error(`Invalid type for flow step: ${type} given.`);
		};

		processStep[type](module.steps[name], module);

		delete module.steps[name].config;
		module.steps[name]['name'] = name;
		module.nodes.steps.push(module.steps[name].container);
	}
}


function getType(type, entry) {
	const scope = type[entry.config.type];

	if (entry.config.type.length === 0) {
		throw new Error(`step.config.type is an empty string.`);
	};

	const entries = Object.entries(scope);

	return entries.find(([key, test]) => test(entry.config.reference))?.[0];
}

function getStepNodes(step, module, node = null) {
	const section = node === null ? module.nodes.flow.querySelector(step.config.reference) : node;

	const strings = step.config.strings;
	const back = 'back' in strings ? section.querySelector(strings.back) : null;
	const next = 'next' in strings ? section.querySelector(strings.next) : null;

	step.container = section;
	step.children = {
		back,
		next
	};

	for (const [key, string] of Object.entries(strings)) {
		const node = section.querySelector(string);

		if (node === null) continue;
		step.children[key] = node;
	}
}

export default processSteps;
