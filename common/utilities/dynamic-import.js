/**
 * A wrapper function to dynamically import a js file in 1 line.
 * @param {string} filepath - The file filepath
 */

class DynamicImport {
	async get(filepath) {
		try {
			const module = await import(filepath);

			if (module.default && typeof module.default === 'function') {
				return module.default;
			}
		} catch (error) {
			console.error(error);
		}
	}
}

export default DynamicImport;