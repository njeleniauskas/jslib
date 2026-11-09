# Dialog
A class handling a single dialog component.

![Static Badge](https://img.shields.io/badge/Version-1.1-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)

<br>

## Overview and Use
This dialog component is an implementation of a modal or non-modal dialog window.

<br>

### Configuration
At minimum, the `Dialog` class needs a way to identify DOM nodes. And this can be accomplished by passing explicit node-identifying strings to the class, or by passing an ID and relying on the default query selector names used internally.

<br>

```javascript
//an ID-based implementation
const args = {
	id: 'main'
};

//passing in explicit node-identifying strings
const args = {
	strings: {
		control: '[data-trigger="main"]',
		dialog: '.primary-dialog',
		close: '[data-close="main"]'
	}
};
```

<br>

By default, a dialog will be moded. However, additional arguments may also be included to change the behavior of the dialog, including making it non-modal, starting in the open state, or including transition classes for CSS animations.

<br>

```javascript
/**
* @param {string} [params.strings.hidden] - The data attribue that identifies the dialog as visible or hidden.
* @param {string} [params.strings.transitionIn] - The class for the opening transition.
* @param {string} [params.strings.transitionOut] - The class for the closing transition.
*
* @param {boolean} params.isModal - Whether the dialog should behave as a modal or non-modal dialog.
* @param {boolean} params.startOpen - Should the dialog start opened or not.
 */
```


<br>


## Animations
If authors wish to animate the opening/closing transitions of the dialog they may do so with CSS. Note that the class will automatically detect the type of transition, and remove class name after that transition/animation ends. A few notes should be made about their behavior:

- The `hidden` attribute should only be used to toggle the display of the dialog.
- The `transitionIn` class is added when the dialog starts to open and is removed when the dialog begins to close.
- The `transitionOut` class is added when the dialog begins to close, and will run for as long as the longest animation on the dialog element.


<br>


## Notes
- This class handles closing transitions manually at present, assuming that `@starting-style`, `transition-behavior`, and `overlay` will not broadly usable until ~2028–9 (refactor will be done once available).
- Events tied to children of a dialog are attached to the dialog to avoid DOM mutation issues.
