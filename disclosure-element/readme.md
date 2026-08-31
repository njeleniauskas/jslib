# Dislcosure element
A class that handles a single disclosure control.

![Static Badge](https://img.shields.io/badge/Version-1.0-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)

<br>

## Overview and Use
The `DisclosureElement` class enables the toggling the visibility of a target element. It may be used for disclosure controls (details/summary, accordion items), and is meant for single-relationship components.

The basic setup only requires an `id` to identify the control/target relationship, however additional arguments can be included to change what attributes will be used.

<br>

```javascript
const args = {
	id: 'de',
	attributes: {
		control: 'data-de-control',
		target: 'data-de-target',
		pressed: 'aria-pressed',
		visibility: 'aria-hidden'
	}
};

const DisclosureElement = new DisclosureElement(args);
```

```javascript
/**
 * @param {object} params
 * @param {string} params.id - the id that links the control and target together
 * @param {string} [params.controlNode] - the data- attribute identifying the control node
 * @param {string} [params.targetNode] - the data- attribute identifying the target node
 * @param {string} [params.pressedAttribute] - the data- attribute for the button state
 * @param {string} [params.discloseAttribute] - the data- attribute for toggling show/hide
 */
```
