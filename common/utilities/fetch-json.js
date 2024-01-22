/**
 * 
 * @param {string} filepath 
 * @param {object} options 
 * @returns promise
 */

async function fetchJSON(filepath, options = {}) {
	const request = new Request(filepath);
	const headers = new Headers();
	const args = {};

	args.method = 'GET';
	args.headers = headers;
	args.mode = 'cors';

	headers.append('Content-Type', 'application/json');

	if (Object.keys(options).length !== 0) {
		Object.assign(args, options);
	}

	try {
		const response = await fetch(request, args);
	
		return response.json();
	} catch(error) {
		console.error(error);
	}
}

export default fetchJSON;