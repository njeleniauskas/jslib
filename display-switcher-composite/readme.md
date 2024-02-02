# Display Switcher (Composite)
A component that handles the toggling of sections within a page, from a controllable composite element.

![Static Badge](https://img.shields.io/badge/Version-1.0-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)
![Static Badge](https://img.shields.io/badge/Language-JavaScript-%232C67BF)
![Static Badge](https://img.shields.io/badge/License-MIT-%232C67BF)


<br>


## Overview
A display switcher is a component that handles the changing of specific sections of a web page from a collection of control options. Functionally this component is similar to a `tablist`, however it is more flexible as the relationship between control and views can be **one-to-many** as well as non-adjacent to one another.

Note that using this component requires an understanding of how composite navigation works (see that module's readme for more).


<br>


## Usage
Assuming all of the dependencies are in the right place, setting up this component requires three things:

<br>

- The proper HTML needs to exist in the DOM before the module is initialized.
- A script file should exist at the end of the document that configures and invokes the class.
- A configuration object needs to describe the desired component setup in order to function.

<br>

### Configuration
Setting up the script module and configuration is fairly easy, and depends on the type of navigation the author wishes to implement (both roving and reference navigation are available). Below is a sample configuration using all of the available options:

<br>

```html
<script type="module">
	import DisplaySwitcherComposite from './path-to-module/module/module.js'

	const args = {
		id: 'dsw-1',
		attributes : {
			componentNode: 'data-dsw',
			referenceNode: 'data-dsw-reference',
			contextNode: 'data-dsw-context',
			parentNode: 'data-dsw-parent',
			childNode: 'data-dsw-child',

			orientation: 'data-orientation',
			activeDescendant: 'data-activedescendant',

			referenceFocus: 'tabindex',
			childFocus: 'data-focused',
			
			selected: 'aria-checked',

			viewNode: 'data-dsw-view',
			viewID: 'data-target',
			controlID: 'data-control',
			display: 'data-hidden'
		}
	};

	const DisplaySwitcher = new DisplaySwitcherComposite(args);
</script>
```

<br>

A more practical example using only required arguments is the following configuration, and defaults to a roving navigation patttern for a composite element:

<br>

```html
<script type="module">
	import DisplaySwitcherComposite from './path-to-module/module/module.js'

	const args = {
		id: 'dsw-1',
		attributes : {
			selected: 'aria-checked'
		}
	};

	const DisplaySwitcher = new DisplaySwitcherComposite(args);
</script>
```

<br>

### HTML
Beyond the `CompositeNavigation` requirements, the HTML of the component needs a few extra things to function properly.

First, controls need to have a selection attribute (like `aria-selected`) to express the state of that control. These attributes depend on the exact implementaion desired. For example, if a display switcher is built using aria `radiogroup` roles, `aria-checked` is needed for the selected attribute.

Second, both controls and views need a data- attribute to store a common value that links the control to that view (or views). An example is the following:

<br>

```html
<!--controls-->
<div>
	<button
		data-dsw-control="first"
		aria-selected="true">
		"First" View's Control
	</button>
	<button
		data-dsw-control="second"
		aria-selected="false">
		"Second" View's Control
	</button>
</div>

<!--views-->
<div
	data-dsw-view="first">
	The First View
</div>
<div
	data-dsw-view="second">
	The Second View
</div>
```

*Note: the proper Composite Navigation attributes also would need to exist in the above example.*

<br>


## Properties
```javascript
/**
 * @param {Object} attributes - An object with data- attribute strings.
 * @param {string} attributes.viewNode - The data- attribute for the view elements.
 * @param {string} attributes.viewID - The data- attribute used to link controls and views.
 * @param {string} attributes.controlID - The data- attribute used to link views and controls.
 * @param {string} attributes.display - The data- attribute tracking the display status of views.
 */
```


<br>


## Future Exploration
- Add multi-argument setting for controls and targets to expand viable code options (like tablist usage).
- Consider adding a live-region flag for communicating effects better(?)