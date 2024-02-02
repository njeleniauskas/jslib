# Overlay Button
A button overlaid onto a user interface.

![Static Badge](https://img.shields.io/badge/Version-1.0-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)

<br>

## Overview and Use
To properly set up, a control element needs to exist in the DOM, and the following arguments should be passed at minimum:

<br>

```javascript
const args = {
	config: 'scroll',
	strings: {
		control: '.button',
		visibility: 'is-visible',
		hidden: '[data-hidden]',
	},
	screenfuls: 2
};
```

<br>

Additional arguments can also be supplied as needed:

<br>

```javascript
/**
 * @param {string} params
 * @param {'scroll'} params.config - The type of disclosure.
 * @param {object} params.strings
 * @param {string} params.strings.control - The string identifying the control node.
 * @param {string} [params.strings.clearing] - The string for the clearing node.
 * @param {string} params.strings.visibility - The class to show/hide the button.
 * @param {string} params.strings.hidden - The attribute used to show/hide content to assistive technologies.
 * @param {number} [params.screenfuls] - The number of screenfuls before showing the button.
 * @param {number} [params.timing] - The delay window for hiding the button. 
 */
```

<br>

### Clearing Nodes
If desired, a clearing node can be included. This changes the behavior so that once the node in the viewport it will clear the button.


<br>


## Notes
- At present, this class only discloses the element via scrolling.