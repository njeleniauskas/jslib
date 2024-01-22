# Dialog
A class handling a single dialog component.

![Static Badge](https://img.shields.io/badge/Version-1.0-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)

<br>

## Overview and Use
This dialog component is an implementation of a moded dialog window.

<br>

### Configuration
At minimum, the `Dialog` class requires strings to identify DOM nodes, and represent state. They are as follows:

<br>

```javascript
const args = {
	strings: {
		passer: 'data-{passer}',
		receiver: 'data-{receiver}',
		window: 'data-{window}',
		control: 'data-{control}',
		hidden: 'data-{hidden}',
	}
}
```

<br>

In addition, the following arguments may also be included:

<br>

```javascript
/**
 * @param {string} [strings.toggle] - The string controlling the transition state of the window.
 * @param {string} [strings.inert] - The string gating interaction on the control element (if a delay is used).
 * @param {string} [timing] - The delay window for toggling the hidden string to the "hidden" state.
 */
```

<br>

The toggle string relies on CSS to transition the visual state of the window, while the inert string, if used, gates the dialog control from being used if a timing argument is used (for separating access to assistive technolgies from animation).

<br>

## Notes
This Dialog should be used in place of the native HTML `<dialog>` element until Safari has enough support (approx. 2025–6).