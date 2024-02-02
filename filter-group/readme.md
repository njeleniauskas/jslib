# Filter Group
A class managing a single FilterGroup component.

![Static Badge](https://img.shields.io/badge/Version-1.1-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)


<br>


## Requirements
- An HTML component in the DOM.
- A `<script type="module">` at the end of the document containing the necessary module import and code.
- An event emitter to pass to the FilterGroup class.

<br>

## Basic Setup
There are a few basic setups that are available for authors. But they essentially come down to two details:

<br>

- `type`: controls are either `binary` (e.g. buttons) or `input` elements.
- `multiSelection`: an (optional) boolean denoting single or multiple selection for controls. The default is false.

<br>

### Single-selection, Binary Filters
```javascript
const args = {
	type: 'binary',
	attributes: {
		group: `data-{group}`,
		control: `data-{control}`,
	},
	indicators: {
		selected: 'aria-selected',
	},
	emitter: emitter,
};
```

<br>

### Multi-selection, Binary Filters
```javascript
const args = {
	type: 'binary',
	multiSelection: true,
	attributes: {
		group: `data-{group}`,
		control: `data-{control}`,
	},
	indicators: {
		selected: 'aria-selected',
	},
	emitter: emitter,
};
```

<br>

### Input Filters
```javascript
const args = {
	type: 'input',
	attributes: {
		group: `data-{group}`,
		control: `data-{control}`,
		method: `data-{method}`,
	},
	emitter: emitter,
};
```

<br>

Beyond these configurations, there are some additional options available to authors:

<br>

### Toggles
If toggling the filter group on/off is relevant, authors can add the following properties. Note that by default, toggling "off" will not reset the filter unless specified;

<br>

```javascript
const args = {
	attributes: {
		toggle: `data-{toggle}`,
	},
	indicators: {
		toggle: 'checked'
	},
	toggleByValue: false //default: false
	toggleResetsFilter: true,
}
```

<br>

### Filter Resetting
For multi-selection filters only, authors can also add resetting arguments if they wish to use a control that clears the filter group selections:

<br>

```javascript
const args = {
	attributes: {
		reset: 'data-{reset}',
	},
	indicators: {
		resetVisible: 'is-visible', //class only
		resetHidden: 'is-hiding', //class only
	},
	resetTiming: 200 //delay window for the visibility indicator. default: 0
}
```

<br>

Two important notes about reset args should be made. Due to accessibility and potential behaviors, resetting requires the usage of two classes that will be inversely toggled on a valid reset change.

If authors wish to animate these indicators, they *must* use keyframe animations, as they are the only solution that can maintain accessibility, and not also create statedness errors. Also note that the hidden class will be cleared after a delay, to return the element to 'idle'. An example is below:

<br>

```scss
.is-visible {
	animation-name: resetIn;
}

.is-hiding {
	animation-name: resetOut;
}

@keyframes resetIn {
	0% {
		visibility: visible;
		//start styles
	}
	100% {
		//end styles
	}
}

@keyframes resetOut {
	0% {
		//start with resetIn end styles
	}
	100% {
		visibility: hidden;
		//end with resetIn start styles
	}
}
```

<br> 

Finally, this also means that when the page renders, the `resetHidden` class should not be included on the reset control, otherwise unwanted animations may occur.

<br>

### Including Methods
For any type of filter control (binary or input), authors may add a `method` attribute controlling how the filter value will be evaluated. For example, adding a method to check for a range of numbers:

<br>

```html
<button 
	data-{method}="&lt"
	data-{control}="20">
	&lt; 20
</button>
```

<br>

or 

<br>

```html
<input 
	type="text"
	data-{method}="includes"
	data-{control}/>
```

<br>

There are a number of accepted methods that authors can use: 

<br>

```javascript
['=', '<', '≤', '<=', '>=', '≥', '>', 'range'] //number methods
['includes'] //string methods
```

<br> 

Also note that for numbers, HTML strings will be converted to the right symbol if using an character code (name/number).

<br>

### Including Comparison Controls
Directly related to methods, a comparison element can also be included when users need to change the comparison on the fly. This only works for inputs, and must use a `<select>` element (at present):

<br>

```html
<select data-{comparison}>
	<option value="&lt;">&lt;</option>
	<option value="&gt;">&gt;</option>
</select>
```


<br>


## Important Notes
While this class allows for a number of configurations, there are a few notes authors should be aware of.

<br>

- An EventEmitter class is required to run properly.
- Binary controls can have multiple, space-separated values, in case a control with multiple options is desired.
- Only single selection is allowed for `type:input`.
- If using a toggle control, an attribute is required for statedness.
- The reset function is only available for `type:binary`.
- Selection statedness must be accessible, hence the use of attributes in the class.


<br>

## Roadmap
- Enable cloned filter groups (linked groups).
- Enable global clearing button.