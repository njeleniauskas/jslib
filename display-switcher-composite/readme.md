# Display Switcher (Composite)
A component that handles the toggling of sections within a page, from a controllable composite element.

![Static Badge](https://img.shields.io/badge/Version-1.1-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)
![Static Badge](https://img.shields.io/badge/Language-JavaScript-%232C67BF)
![Static Badge](https://img.shields.io/badge/License-MIT-%232C67BF)


<br>


## Overview
A display switcher handles the changing of sections of a web page from a collection of control options. Functionally this component is similar to a `tablist`, however it is more flexible as the relationship between control and views can be **one-to-many** as well as being non-adjacent to one another.

Note that using this component to its fullest extent requires an understanding of how the [Composite Navigation](https://github.com/njeleniauskas/jslib/tree/master/common/composite-navigation) module works.


<br>


## Usage
Assuming all of the dependencies are in the right place, setting up this component requires three things:

<br>

- The proper HTML needs to exist in the DOM before the module is initialized.
- A script element should exist at the end of the document that configures and invokes the class.
- A configuration object needs to describe the desired component setup in order to function.

<br>

### Configuration
Setting up the script module and configuration is fairly easy, and depends on the type of navigation the author wishes to implement. Both roving and reference navigation patterns are available, however, the most common setup authors will use is a roving navigation pattern:

<br>

```javascript
import DisplaySwitcherComposite from './path-to-module/module/module.js'

const args = {
	id: 'dsc-1',
	attributes : {
		componentNode: 'data-dsc',
		childNode: 'data-dsc-child',
		viewNode: 'data-dsc-view',

		orientation: 'aria-orientation',
		selected: 'aria-checked',

		controlID: 'data-control',
		viewID: 'data-target',
		display: 'aria-hidden'
	}
};

const DisplaySwitcher = new DisplaySwitcherComposite(args);
```

<br>

Reference navigation is also available, and needs a few more arguments so that the activedescendant and pseudo-focus behaviors will work properly:

<br>

```javascript
import DisplaySwitcherComposite from './path-to-module/module/module.js'

const args = {
	id: 'dsc-1',
	attributes : {
		componentNode: 'data-dsc',
		childNode: 'data-dsc-child',
		viewNode: 'data-dsc-view',

		orientation: 'aria-orientation',
		activeDescendant: 'aria-activedescendant',
		childFocus: 'data-focused',
		selected: 'data-checked',

		controlID: 'data-control',
		viewID: 'data-target',
		display: 'aria-hidden'
	}
};

const DisplaySwitcher = new DisplaySwitcherComposite(args);
```

<br>

It is also possible to pass only an ID, and rely on the component's fallback attributes to implement a roving navigation patttern for a composite element. However, this requires the author to be familiar with what the fallback attributes are for this component and the Composite Navigation module.

<br>

```javascript
import DisplaySwitcherComposite from './path-to-module/module/module.js'

//mising args have fallback values
const args = {
	id: 'dsc-1'
};

const DisplaySwitcher = new DisplaySwitcherComposite(args);
```

<br>

### HTML
Beyond the `CompositeNavigation` and `common/utility/` function requirements, the HTML of the component needs a few things to function properly.

First, controls need to have a selection attribute (like `aria-selected`) to express the state of that control. For example, if a DisplaySwitcher is built using aria `radiogroup` roles, `aria-checked` is needed for the selected attribute.

Second, both controls and views need a data- attribute to store a common value that links the control to that view (or views). An example is the following:

<br>

```html
<!--controls-->
<div>
	<button
		data-dsc-control="first"
		aria-selected="true">
		"First" View's Control
	</button>
	<button
		data-dsc-control="second"
		aria-selected="false">
		"Second" View's Control
	</button>
</div>

<!--views-->
<div
	data-dsc-view="first">
	The First View
</div>
<div
	data-dsc-view="second">
	The Second View
</div>
```

*Note: the proper Composite Navigation attributes also would need to exist in the above example.*

<br>

Lastly, if reference navigation is being used, each control will need an ID to communicate the right activedescendant value to the reference node.

<br>

### Additional Notes
- It is possible to engineer this component to be far more explicit structurally than is practical. This is partly a side-effect of implementing composite-navigation, but is also available should authors wish to be more explicit about the html structure of the component. See the [Composite Navigation](https://github.com/njeleniauskas/jslib/tree/master/common/composite-navigation) readme for more.
- While authors can supply multiple contexts to this component, it will only ever use one.

<br>


## Properties (DisplaySwitcherComposite)
When using this module, three "data" objects are used for internal functionality: `props`, `data`, and `state`.

<br>

The `props` object stores read-only data, and is where the configuration is stored:

```jsdoc
/**
 * @param {string} props.id - The id that defines the context of data- attributes.
 * @param {string} props.attributes.component - The data- attribute for the component node.
 * @param {string} props.attributes.reference - The data- attribute for the reference node.
 * @param {string} props.attributes.context - The data- attribute for the context nodes.
 * @param {string} props.attributes.parent - The data- attribute for the parent node.
 * @param {string} props.attributes.child - The data- attribute for child nodes.
 *
 * @param {string} props.attributes.view - The data- attribute for view nodes.
 * @param {string} props.attributes.controlID - The data- attribute for linking controls to views.
 * @param {string} props.attributes.viewID - The data- attribute for linking views to controls.

 * @param {string} props.attributes.contextState - Identifies which context should be used for navigation.
 * @param {string} props.attributes.orientation - Optional property to assign aria- string.
 * @param {string} props.attributes.activeDescendant -  Optional property to assign aria- string.
 * @param {string} props.attributes.referenceFocus - String based on roving or reference navigation needs.
 * @param {string} props.attributes.childFocus - String based on roving or reference navigation needs.
 * @param {string} props.attributes.selected - Used to allow function to know last component selection.
 * @param {string} props.attributes.display - The attribute used to control the visibility of views in the DOM.
 */
```

<br>

The `data` object stores the static node references for the module:

```jsdoc
/**
 * @param {Object} nodes - An object containing static nodes.
 * @param {Object} nodes.component - The node that encapsulates the overall component.
 * @param {Object} nodes.reference - The node that stores reference data, or receives focus.
 * @param {array} nodes.contexts - An array of all of the interaction contexts that exist.
 * @param {array} nodes.views - An array of all of the views that exist.
 * /
```

<br>

Finally, the `state` object handles the context and data state of the module:

```jsdoc
/**
 *  @param {Object} navigation - An object containing dynamically set nodes.
 *  @param {node} navigation.context - The node that represents the current navigation context.
 *  @param {node} navigation.parent - The parent node in the current navigation context.
 *  @param {array} navigation.children - The children in the current navigation context.
 *  @param {node} navigation.focusedChild - The current child that is "focused."
 *  @param {node} navigation.lastFocusedChild - The last child that was "focused."
 *
 * @param {boolean} isKeyEvent - Indicates if the current event is a key event.
 * @param {boolean} isPointerEvent - Indicates if the current event is a pointer event.
 * @param {boolean} clickEscapesContext - Helps determine if a pointer event leaves the component.
 * @param {boolean} isInitial - Indicates if the component is in its initial state.
 *
 * @param {Object} language - An object storing the direction and writing mode of the document.
 * @param {string} language.direction - The current direction of the document.
 * @param {string} language.writingMode - The current writing-mode of the document.
 *
 * @param {Object} navigationKeys - The valid, and conditioned navigation keys for the component.
 * @param {string} orientation - The current orientation value of the component.
 * /
```


<br>


## Future Exploration
- Add multi-argument setting for controls and targets to expand viable code options (like tablist usage).
- Consider adding a live-region flag for communicating effects better(?)
