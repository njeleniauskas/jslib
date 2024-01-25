/**
 * 
 * @param {string} filepath 
 * @param {object} options 
 * @returns promise
 */

async function fetchJSON(filepath, options = {}) {
	const request = new Request(filepath);
	const headers = new Headers();
	let args = {...request};

	headers.append('Content-Type', 'application/json');
	
	if (!('headers' in args)) {
		args.headers = {};
	}

	args.headers = {...headers};

	if (Object.keys(options).length !== 0) {
		args = {...args, ...options};
	}

	try {
		const response = await fetch(request, args);
	
		return response.json();
	} catch(error) {
		console.error(error);
	}
}

export default fetchJSON;