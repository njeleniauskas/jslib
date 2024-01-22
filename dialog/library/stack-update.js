function updateStack(params) {
	let inStack = false;

	for (let i = params.stack.length - 1; i >= 0; i--) {
		if (params.receiver === params.stack[i].passer) {
			inStack = true;
		}
	}

	//Note: simple function at present (not accounting for user focus changes)
	if (inStack) {
		params.stack.pop();
	} else {
		const item = {
			passer: params.passer,
			receiver: params.receiver,
			id: params.id
		};

		params.stack.push(item);
	}
}

export default updateStack;