/**
 * @param {string} domain - The domain name string — to check for local links.
 * @returns array of internal links.
 */

function collectLocalLinks(domain) {
	const anchors = Array.from(document.querySelectorAll('a'));
	const results = [];

	anchors.forEach((anchor) => {
		const isLocal = anchor.href.includes(domain);
		const hash = anchor.getAttribute('href');
		const isAnchorLink = hash.startsWith('#');

		if (isLocal && !isAnchorLink) {
			results.push(anchor);
		}
	});

	return results;
}

export default collectLocalLinks;