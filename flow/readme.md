Is there anything that I'm missing yet here???
- check dialog to see if you can hook into adding here?


![Static Badge](https://img.shields.io/badge/Version-1.0-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)
---

<br>

# Overview and Use
A `Flow` is a sequence of dynamic content that lets a user progress between steps sequentially (or otherwise). This class handles the two main aspects of a flow, stepping between each step and responding to each step's completion — whether that's saving data, or changing the state of the UI in some way.

<br>

To set this class up, at minimum, an ID needs to be passed to the class along with the steps in the flow:

```javascript
const flow = new Flow({
	id: 'flow1',
	steps: {}
});
```

<br>

Beyond this, there are two main ways to set up a Flow. First, authors can include an element in the DOM that will serve as the container for the steps for that flow.

```html
<!-- somewhere in the DOM -->
<div data-flow="flow1">
	...
</div>
```

<br>

Second, authors authors can create the flow containing element and store it in memory so that it can be reused without mutation errors occurring.

```javascript
const flowElement = document.createElement('div');

const flow new Flow({
	...
	container: flowElement
})
```

<br>

This second method lets a single container hold multiple flows, if desired. The query string identifyling the flow element is not "functionally" necessary with this method. However the string will automatically be applied in case this ID will be used for some other purpose (e.g. styling).

<br>


## Steps
A Flow requires that at least 2 steps exist to work properly. Each step is passed in as an object an has several different properties that may be needed, depending on the way elements make it to the DOM. This is handled by the `config` property which must include at least a `type` and `reference`. But other properties may be needed based on the approach.

<br>

### Step Exists in the DOM
The first approach expects the step to already exist in the DOM and needs a query string to collect that element, and any important children you will want to reference.

```javascript
const step = {
	config: {
		type: 'id',
		reference: '[data-attr-string]',
		strings: {
			next: '.next-button'
		}
	}
}
```

<br>

Note that this method cannot be used if the entire flow is being dynamically added to the DOM.

<br>

### Step is a Template Literal
The second approach is to pass the step in as a template literal. In this case, the class will build the elements from this template and append them to the flow element.

```javascript
const step = {
	config: {
		type: 'template',
		reference: `<div data-flow-step="first">...</div>`,
		strings: {
			back: '.back-button'
		}
	}
}
```

<br>

### Step is an Element in Memory
Finally, authors can also pass in an object that contains both the element tree that will be appended to the DOM, as well as a collection of important nodes that need references. Note that in this version, strings are not needed as you can pass the node references directly. This also requires the function to return an object with both the container and children too (IIFE).

```javascript
const step = {
	config: {
		type: 'template',
		reference: (() => {
			const container = document.createElement('div');

			//add attributes, children, etc...

			return {
				container,
				children: { ... }
			}
		})(),
	}
}
```

<br>

It is also important that the container element that is passed is ***not*** a `documentFragment` or a `<template>` as the class internals expect elements that will survive mutation and can be directly appended to the DOM.

<br>

## Step Actions
In addition to the intitial config of each step, authors will also have to pass in actions for moving between steps. Each of these actions has access to the class'es state object, so the current `step`, a `body` object, and `canUpdate` properties are all available.


```javascript
const step = {
	config: { ... },
	actions: {
		next: (state) => {
			//process this step
		}
	}
}
```

<br>

Note that if an action is not provided, it also will prevent steps from changing via that element. In addition, an action can also be `async`, meaning that changing from one step to another can wait until that async process finishes before continuing.

<br>

Finally, the names of the object keys will be used to connect nodes and actions together. For example, a next button needs to have a `next` key in `config.strings` if a query string or template literal is used, as well as `actions` for the action to be associated with that element.

<br>

## Additional arguments
In addition to the `id` and `steps` arguments, authors can pass in other args to change the default values of different properties if they wish.


```javascript
/**
 * @param {string} [params.strings]
 * @param {string} [params.strings.flow] - Identifies the overall flow container.
 * @param {string} [params.strings.step] - The attribute representing the current step's name.
 * @param {string} [params.strings.focusable] - Identifies focusable elements within a step.
 * @param {string} [params.strings.hidden] - The display attribute to show/hide steps.
 *
 * @param {string} [params.container] - The flow-containing element.
 */
```

<br>

## Event Emitter use
In certain circumstances, it may be necessary to include an `EventEmitter` to the class so that external interactions can manipulate the `Flow` in different ways, or respond to its effects.

<br>

When actions for back and next buttons are included, an emitter will also emit events when those functions complete. They are either `flow/${module.id}:back` or `flow/${module.id}:next`. Each of these functions will pass the name of the target step as an argument.

<br>

Conversely, if external behaviors should affect a flow, authors can call three different events:

- `flow/${module.id}:can-update`: allow/disallow the flow from changing steps.
- `flow/${module.id}:change-step`: change steps based on the ID passed.
- `flow/${module.id}:reset`: reset the flow to its initial step/state.

<br>


# Notes
- If needed, authors can use state.body to temporarily store data that will be sent via a `POST` or other request. This data will persist depending on how the author handles each step.
- In order for focus to be passed properly between steps, authors will need to add a focusable attribute to each element they want to be able to be focus on a step change.
