# Focus Passer
A method of handling focus changes between related elements.

<br>

## Overview
Focus passing involves moving focus from one element to another by a non-navigation user event: clicking on a passing control, using the `Escape` key, or clicking outside of a context.

Focus passing only contains a single JavaScript function to handle the passing behavior, as the triggers can vary, and are generally specific to a component.


<br>

## The Structure
When setting up focus passing within this library, two attributes are needed to identify the passing element, and the receiving element. Each pair needs to share a unique ID so they can be connected to each-other:

<br>

```html
	<button data-{passer}="ID1" data-{receiver}="ID2">Passing Control</button>

	<div data-{receiver}="ID1">
		<button data-{passer}="ID2">Close</button>
	</div>
```

<br>

Note that a passing element can also be a receiver, enabling many different configurations.

<br>

## Types of Focus
Within an interface, there are two types of focus that can occur: direct or indirect.

- **Direct**: Direct focus is 'normal' focus, where an element in the dom has focus, and whose state can be monitored through focus/blur or the documents `activeElement`.
- **Indirect**: Indirect focus is where, through JavaScript, an element is in 'focus' despite it not being the current `activeElement`. This situation happens in composite elements like interactive tables, tabs, or similar components that have unfocusable, interactive children.

When using direct focus, only the receiver node needs to be passed to the passing function:

<br>

```javascript
updateFocusPair({
	receiver: receiverNode
});
```

Indirect focus is more involved, as the focus identifier could be a class, attribute, or an attribute value. In this case, the possible arguments are as follows:

<br>

```javascript
/**
 * @param {object} [params.passer] - The passing node related to the receiver by attribute ID.
 * @param {object} [params.indicator] - The indicator used (class or attribute).
 * @param {'attribute' | 'class'} [params.indicatorType] - The type of indicator used.
 * @param {boolean} [params.attributeByValue] - Whether 'statedness' is by a specific value or  the existence of an attribute.
 * @param {'direct' | 'indirect'} type - How focus should be handled. The default is 'direct'.
 */ 
```


<br>


## Notes
- Only currently supports same-focus changes, e.g. both nodes are "directly" or "indirectly" focused.
- Finding the correct nodes is handled elsewhere.