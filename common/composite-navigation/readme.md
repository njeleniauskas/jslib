# Composite Navigation
A module of functions handling the core navigational interaction for many different kinds of composite elements.

![Static Badge](https://img.shields.io/badge/Version-1.1-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)

<br>

## Overview and Purpose
The goal of this module is to handle the **internal navigational functionality** of a of composite element: e.g. a component that is a single `Tab` stop, and have children that can be traversed via standard navigation keys — for example, a list of tabs (`tablist`) or a list of options users can select from (`listbox`).


<br>


## Module Design and Usage
### Requirements
While this module is very flexible, there are two requirements necessary for it to work:

<br>

- An `id` **must** be passed as an argument to properly identify the specific elements in the DOM that belong to this component.
- A `<div>` or `<table>` element **must** be used to represent a context node (`<table>` for interactive tables/grids only). This restriction helps preserve the native semantics of the navigation context by lowering the adjustments needed for any type of component.

<br>

### Module Arguments
When using this module, several arguments can be passed depending on the functionality that is desired. And as noted previously, only the `id` is required — other elements will fall back to other attribute names when not provided.

<br>

```javascript
const args = {
	id: '{id}', //required
	attributes : {} //optional
};

//other available attributes and their default values
attributes : {
	contextNode: 'data-cn',
	componentNode: 'data-cn', //falls back to context
	parentNode: 'data-cn', //falls back to context
	childNode: 'data-cn-child',

	contextState: 'data-cn-current',
	orientation: 'data-orientation',
	activeDescendant: 'data-activedescendant',
	componentFocus: 'data-focused',
	childFocus: 'tabindex',
	selected: 'data-selected',
}
```

<br>

### Navigation Patterns
There are two common engineering patterns that can handle composite navigation, and both are suppored with this module.

<br>

- **Roving Navigaiton**: Combines interactive children with `tabindex` to manage focus. As child elements become "focused", tabindex values change from `-1` to `0`. This allows child elements to be included in the normal tab sequence.
- **Reference Navigation**: The parent element is the focusable element (not children), and the current "active" child element is identified by the `aria-activedescendant` attribute on the component node (via the `id` attribute on the child).

<br>

#### Valid Configurations
When setting up a component that uses this module, only a few attribute configurations are valid to help maintain an accessible experience. The following valid parent/child configurations are:

**Config 1 (roving)**
```javascript
	componentNode: 'data-{component}' //not 'tabindex'
	childNode: 'tabindex'
```

<br>

**Config 2 (roving)**
```javascript
	componentNode: 'data-{component}' //not 'tabindex'
	activeDescendant: 'data-{activedescendant}' //not 'aria-activedescendant'
	childNode: 'tabindex'
```

*Note: This pattern enables a component-like operation, without actually including the accessible endpoints. It is included in case authors wish to monitor the `data-activedescendant` attribute, while using a roving navigation pattern.*

<br>

**Config 3 (component)**
```javascript
	componentNode: 'data-{component}'
	componentFocus: 'tabindex'
	activeDescendant: 'aria-activedescendant'
	childNode: 'data-{child}' //not 'tabindex'
```

<br>

**Config 4 (component)**
A fourth config will be available once multiAxis navigation is enabled.

<br>

If no arguments are supplied or some are missing, the fallback configuration for attributes is a **roving tabindex** as it is more reliable at communicating state at present (Sep 2023).

<br>

### Arguments
#### Orientation
Orientation is used internally to set up keyboard functionality, and if authors wish to enable aria support for the orientation of a navigation context (for semantic/accessible reasons), `aria-orientation` can be passed via the `orientation` argument.

<br>

#### Selected
Different components need different "selection" attributes to function properly. For example, a composite-navigation component could be a radiogroup, in which case `aria-checked` needs to be passed to this attribute. Similarly, a `tablist` needs the `aria-selected` attribute to function properly.

<br>

### HTML, and Attribute Relationships
As previously noted, the element representing the navigation context must be a `<div>` or `<table>` — the latter being used to represent interactive grids or tables.

Apart from this requirement however the HTML architecture can be very flexible and meet many different design approaches. However, because of this flexibility some details needs to be clarified.

First, descriptive arguments are tied to specific nodes internally. This is reflected in the argument names — for example, the `activeDescendant` attribute must be added to the `componentNode` to work. The following example shows the explicit argument relationships that exist internally, and represents the (near) total available HTML flexibility that is possible:

<br>

```html
<!-- html elements and their related attributes -->
<context
	data-{context}="{id}">

<component
	data-{component}="{id}"
	{orientation}
	{active-descendant}="{child-id}"
	{component-focus}>

<parent
	data-{parent}="{id}">

<child
	id="{child-id}"
	data-{child}="{id}"
	{child-focus}
	{selected}>
```

<br>

Many times this kind of explicit property-to-html setup isn't needed, so internally, many nodes will fallback to other elements based on which attributes are passed in `args`. And as a result, a single html element can occupy several roles — for an example, a single container element functioning as the `context`, `component`, and `parent` node simultaneously.

<br>

```html
<!--the context node is also acting as the component and parent node in this example -->
<context
	data-{context}="{id}"
	{orientation}>
		<child
			data-{child}="{id}">
			…
		</child>
		…
</context>
```

<br>

Note that attributes to define the navigation configuration would also be needed in this setup, depending on whether the component uses roving or component navigation.

### Context, Reference, and Parent attributes/nodes
While many times, it will not be valuable to explicitly set up the `contextNode`, `componentNode`, and `parentNode` attributes, there is a reason why each exists.

- **contextNode**: multiple context nodes can be provided in case a component needs to switch navigation contexts (internally), or if the collection of children will be rendered dynamically.
- **componentNode**: use this attribute when the component node should be different from a navigation context.
- **parentNode**: provide when the containing element and children will be dynamically rendered. Here, the context node will remain as the stable entry point to the DOM.

<br>

### Navigation Keys
The following keys are available to use once the component is in focus. These keys are automatically configured to handle every orientation, language direction, and writing mode. And they are organized for multi-axis use as well.

<br>

- `↑`, `↓`, `←`, and `→`: Arrow keys step through the children of the target parent context based on the orientation of the component and a user's language settings. Arrows that are cross-axis can be used to navigate a secondary axis (once available).
- `Home` and `End`: navigate to the first or last children in a component.
- `PageUp` and `PageDown`: Once available, these keys can be used for multi-axis navigation.

<br>

### Additional Notes
#### Element Focus is Required
Regardless of the navigation pattern being used, there **must** be a single element within a component using this pattern that is focusable (either the component node, or a child). This is required so that assistive technologies can communicate actions and state properly to users.

<br>

#### Data Attributes Mimic State
Some data- attributes are used to "mimic" state for elements that do not receive focus. Authors can use these attributes to enable CSS to communicate state to users if they wish to.

As an example, in a roving navigation pattern, while children technically get focus, to a user the "component" is the focus target. And it may be desirable to include styling to indicate this state.

<br>

#### Elements in the DOM need to be focusable on instantiation
When a component using this module is instantiated, it checks interactivity for the component/child components. If neither are focusable when this module is invoked, the module will not validate.


<br>


## Future Exploration
- Add cross-axis navigation support.
- Add cross-axis enter/exit memory.
