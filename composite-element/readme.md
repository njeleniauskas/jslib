# Composite Element
A class that handles the core navigation and focus behaviors for different kinds of components that need composite navigation.

![Static Badge](https://img.shields.io/badge/Version-1.0-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)
![Static Badge](https://img.shields.io/badge/Language-JavaScript-%232C67BF)
![Static Badge](https://img.shields.io/badge/License-MIT-%232C67BF)


<br>


## Overview
A Composite Element is the core module for building interactive components that require [Composite Navigation](https://github.com/njeleniauskas/jslib/tree/master/common/composite-navigation) — that is, a component that is a single Tab stop, and has children that can be traversed via standard navigation keys.

<br>

This base class is designed so that it can be extended to build more specific components, like a `tablist`, `combobox`, `toolbar` or interactive `grid` or `table`. One existing example of this is the [DisplaySwitcher](https://github.com/njeleniauskas/jslib/tree/master/display-switcher-composite) component.


<br>


## Usage
Assuming all of the JS dependencies are in the right place, setting up this component requires three things:

<br>

- The proper HTML needs to exist in the DOM before the module is initialized.
- A script element should exist that configures and invokes the class.
- Arguments need to be passed to describe the desired component setup in order to function.

<br>

### Configuration
Setting up the script module and configuration is easy, and depends on the type of navigation the author wishes to implement. Both **roving** and **reference** navigation patterns are available, however, the most common setup authors will use is a roving navigation pattern:

```javascript
import CompositeElement from './path-to-module/module/index.js'

const args = {
	id: 'ce-1',
	attributes : {
		contextNode: 'data-ce',
		childNode: 'data-ce-child',
	}
};

const compositeElement = new CompositeElement(args);
```

<br>

Reference navigation is also available, and needs a few more arguments so that the activedescendant and (pseudo) focus behaviors will work properly:

<br>

```javascript
import CompositeElement from './path-to-module/module/index.js'

const args = {
	id: 'ce-1',
	attributes: {
		contextNode: 'data-ce',
		childNode: 'data-ce-child',
		activeDescendant: 'aria-activedescendant' //optional
	},
	navigationType: 'reference'
};

const CompositeElement = new CompositeElement(args);
```

<br>

It is also possible to pass the `id` as the ***only argument***, and rely on the component's internal fallback attributes to implement a Composite Element. This will result in a roving navigation pattern, and requires the author to be familiar with what the fallback attributes used in the [Composite Navigation](https://github.com/njeleniauskas/jslib/tree/master/common/composite-navigation) module.


### HTML
Beyond the `CompositeNavigation` and `common/utility/` function requirements, the HTML of the component need, at minimum, the data attributes that will be used to identify the nodes belonging to this component instance. One example of roving navigation is as follows:

```html
<Context
	data-ce="{id}"
	{orientation}>
		<Child
			data-ce-child="{id}"
			{focusMethod}>
		</Child>
		…more children
</Context>
```

If reference navigation is used, each child must have an `id` to properly communicate to the component node what value is currently "in focus" via an `activedescendant` attribute on the component element (data- or aria-).

<br>

Finally, authors can structure this component much more explicitly if they wish to. See [Composite Navigation](https://github.com/njeleniauskas/jslib/tree/master/common/composite-navigation) for what each node reference represents.


<br>


## Extending the model
A Composite Element is designed to be extended so that it can be used as the core navigation module for other components, like a `tablist`. To aid in this, there are two features that can be used to achieve this result.

<br>

### Intern
First, on `focusin` or `reset`, the index of the target child element can be computed differently if a custom function is supplied. This custom function provides two arguments: the children of the current context, and the target child from a poinderdown event (or null). A sample setup is as follows:

```javascript
const targetIndexFunction = ({ children, pointerEventChild }) => {
	//functionality here
}

const args = {
	//...main arguments
	functions: {
		targetIndex: targetIndexFunction
	}
};
```

<br>

In addition, there are several optional callback hooks available internally. They exist so that authors can react to events and changes in state. And each callback has a corresponding emitter event (if supplied), if external behaviors are also needed.

- `pointerdownStart()`: fires at the beginning of the pointerdown event.
- `pointerdownEnd()`: fires at the end of the pointerdown event.
- `keydownStart()`: fires at the beginning of the keydown event.
- `keydownEnd()`: fires at the end of the keydown event.
- `focusStateUpdated()`: fires immediately after the focus state has changed (during a pointerdown or keydown event).
- `focusTargetReleased()`: fires on a click or keyup event when a valid focus target exists.
- `reset()`: fires after the component resets to its initial state.

<br>

Each callback/emitter event provides an object with different data for use:

- `pointerdownStart()`: the class `module` and `event` object.
- `pointerdownEnd()`: the class `module` and `event` object.
- `keydownStart()`: the class `module`, `event` object, and and an object called `keydownState` for internal keydown logic.
- `keydownEnd()`: the class `module` and `event` object.
- `focusStateUpdated()`: the class `module`, `event`, and `targetChild` that has focus just received focus.
- `focusTargetReleased()`: the class `module`, `event`, `children` of the current context, and the `targetChild` that has focus.
- `reset()`: class `module` and `context` that was last in focus.

<br>

Emitter events differ from these callback functions in three ways:

- Each event follows a template for its full name: `{name}/{id}:{event}`.
- Event names are written in **kebab-case** instead of camelCase: `pointerdown`, `keydown`, `focus-state-updated`, `focus-target-released`, and `reset`.
- Emitter events do not pass the class module as an argument.

<br>

As an example, the emitter event for `focus-state-updated` might be `tablist/global:focus-state-updated`, depending on the name and id passed.


<br>



## Properties (CompositeElement)
When using this module, three internal objects are used for storing different kinds of data. The `props` object stores read-only data, and is where the configuration is stored:

```javascript
/**
 * @param {string} params.id - The id that defines the context of attributes.
 * @param {string} [params.attributes.contextNode] - The attribute for the navigation context node(s).
 * @param {string} [params.attributes.componentNode] - The attribute for the node that represents the component.
 * @param {string} [params.attributes.parentNode] - The attribute for the parent node (for dynamic generation).
 * @param {string} [params.attributes.childNode] - The attribute for child nodes.
 *
 * @param {string} [params.attributes.orientation] - Optional property to assign aria- string.
 * @param {string} [params.attributes.activeDescendant] - Optional property to assign aria- string.
 *
 * @param {string} [params.attributes.contextRole] - Used to identify the role a context is representing (e.g. component, listbox, etc…).
 * @param {string} [params.attributes.contextState] - Used to identify which context should be used for navigation.
 * @param {string} [params.attributes.componentFocus] - The attribute used for the component's focus state.
 * @param {string} [params.attributes.childFocus] - The attribute used for a child's focus state.
 *
 * @param {object} [params.navigationType] - The type of navigation behavior for the component [roving (default) or reference]
 */
```

<br>

The `nodes` object stores the persistent nodes for the module:

```javascript
/**
 * @param {Object} nodes
 * @param {array} nodes.contexts - An array of all of the navigation contexts that exist.
 * @param {Object} nodes.component - The node that acts as the component element.
 * /
```

<br>

Finally, the `state` object handles the context and data state of the module:

```javascript
/**
 *  @param {Object} nodes
 *  @param {node} nodes.context - The current navigation context.
 *  @param {node} nodes.lastContext - The last context that was active.
 *  @param {node} nodes.parent - The parent node in the current navigation context.
 *  @param {array} nodes.children - The children in the current navigation context.
 *  @param {node} nodes.focusedChild - The current child that is "focused."
 *  @param {node} nodes.lastFocusedChild - The last child that was "focused."
 *
 * @param {boolean} isKeyEvent - Indicates if the current event is a key event.
 * @param {boolean} isPointerEvent - Indicates if the current event is a pointer event.
 * @param {boolean} clickEscapesContext - Helps determine if a pointer event leaves any context.
 * @param {boolean} isInitial - Indicates if the component is in its initial state.
 *
 * @param {Object} language
 * @param {string} language.direction - The current direction of the document.
 * @param {string} language.writingMode - The current writing-mode of the document.
 *
 * @param {Object} eventKey - An object that temporarily stores the event.key and event.key.shiftKey values.
 * @param {Object} navigationKeys - The valid, and conditioned navigation keys for the navigation context.
 * @param {string} orientation - The current orientation value of the component.
 * /
```


<br>


## Additional Notes
- Using pointer-events: none on children will break some behaviors for this component. Only use it if you want to make sure a child will not activate or change the state of this component somehow.
- If the component element is not also a context element, the `orientation` attribute will need to be placed on both elements for navigation config and semantic correctness.
