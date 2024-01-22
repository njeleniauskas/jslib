# Route Transition
A class that handles sever-side rendered routing transitions.

![Static Badge](https://img.shields.io/badge/Version-1.0-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)

<br>

## Overview and Use
The `RouteTransition` class delays the routing of internal links in order to enable more seamless transitions from page to page. It enables visual transitions similar to a single-page app, but with a server-side rendered app (like a php application).

The basic setup requires every argument, and can be seen below:

<br>

```javascript
const args = {
	domain: 'localhost',
	selector: '[data-route-transition]',
	delay: 250,
	class: 'is-routing'
};
```

```javascript
/**
 * @param {object} params - The parameters needed for the functions to work.
 * @param {string} params.domain - The string of the local domain.
 * @param {string} params.selector - The query selector string for animation nodes.
 * @param {string} params.class - The class to trigger animation.
 * @param {number} params.delay - The delay window size.
 */
```

<br>

Note that the delay/routing behavior only runs after an internal link is clicked.