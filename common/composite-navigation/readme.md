# Composite Navigation
A module of functions handling the core navigational interaction for many different kinds of composite elements.

![Static Badge](https://img.shields.io/badge/Version-1.0-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)

<br>

## Overview and Purpose
The goal of this module is to handle the **internal navigational functionality** of a of composite element: e.g. a component that is a single `Tab` stop, and have children that can be traversed via standard navigation keys — for example, a list of tabs (`tablist`) or a list of options users can select from (`listbox`).


<br>


## Module Design and Usage
There are several details and authors should know about if using this module to build their own compontents.

<br>

### Requirements
While this module is very flexible, there are two requirements necessary for it to work:

<br>

- An `id` **must** be passed as an argument to properly identify the specific component and its elements in the DOM.
- A `<div>` or `<table>` element **must** be used to represent the component node (`<table>` for interactive tables/grids only). This restriction helps preserve the native semantics of the component/children by lowering the manual adjustments necessary for any type of component.

<br>

### Module Arguments
When using this module, several arguments can be passed to a component depending on the kind of functionality and features an author wishes to have. And as noted previously, only the `id` is required:

<br>

```javascript
const args = {
		id: '{id}' //required
		attributes : {
			componentNode: 'data-{component}',
			referenceNode: 'data-{reference}',
			contextNode: 'data-{context}',
			parentNode: 'data-{parent}',
			childNode: 'data-{child}',
			orientation: '{orientation}',
			activeDescendant: '{activedescendant}',
			referenceFocus: '{reference-focus}',
			childFocus: '{child-focus}',
			selected: '{selected}',
		}
	};
```

<br>

See [Data Objects and Properties](#data-objects-and-properties) for more details on all of the properties used in this module.

<br>

### Navigation Patterns
There are two common engineering patterns that can handle composite navigation, and both are suppored with this module:

<br>

- **Roving Navigaiton**: Combines interactive children with `tabindex` to manage focus. As child elements become "focused", tabindex values change from `-1` to `0`. This allows that child element to be included in the normal tab sequence.
- **Reference Navigation**: The parent element is the focusable element (not children), and the current "active" child element is identified by the `aria-activedescendant` attribute on the parent (via the `id` attribute).

<br>

#### Valid Configurations
When setting up a component that uses this module, only a few attribute configurations are valid to help maintain an accessible experience. The following valid parent/child configurations are:

**Config 1 (roving)**
```javascript
	referenceNode: 'data-{reference}' //not 'tabindex'
	childNode: 'tabindex'
```

<br>

**Config 2 (roving)**
```javascript
	referenceNode: 'data-{reference}' //not 'tabindex'
	activeDescendant: 'data-{activedescendant}' //not 'aria-activedescendant'
	childNode: 'tabindex'
```

*Note: This pattern enables a reference-like operation, without actually including the accessible endpoints. It is included in case authors wish to monitor the `data-activedescendant` attribute, while using a roving navigation pattern.*

<br>

**Config 3 (reference)**
```javascript
	referenceNode: 'data-{reference}'
	referenceFocus: 'tabindex'
	activeDescendant: 'aria-activedescendant'
	childNode: 'data-{child}' //not 'tabindex'
```

<br>

**Config 4 (reference)** <br>
A fourth config will be available once multiAxis navigation is enabled.

<br>

If no arguments are supplied or some are missing, the fallback configuration for attributes is a **roving tabindex** as it is more reliable at communicating state at present (Sep 2023).

<br>

### Optional Arguments
Apart from the `id` and configuration, several arguments left to the discretion of the author, allowing a little flexibility in naming and functionality. These attributes include `componentNode`, `referenceNode`, `contextNode`, `parentNode`, `childNode`, `orientation`, and `selected`:

<br>

#### Nodes
Node aguments allow authors to use their own custom-named data- attributes if they wish. The default being `data-ce-{node}` or `data-ce` for the component. 

If no argument is provided, node attributes — excluding children — have a fallback. If no `referenceNode` or `contextNode` arguments are provided, both will used the `componentNode` attribute instead. If no `parentNode` argument is provided, it first falls back to the `contextNode` attribute. And if that argument also isn't provided, the `componentNode` attribute string is used.

<br>
 
#### Orientation
If authors wish to enable aria support for the orientation of the component (for semantic/accessible reasons), `aria-orientation` can be passed via the `orientation` argument.

<br>

#### Selected
Components that include selection functionality require a slightly different focus behavior when a user enters an unfocused component. By passing a selection attribute via the `selected` argument, the functions handling focus can know this detail as well.

<br>

See [Data Objects and Properties](#data-objects-and-properties) for more property details.

<br>

### HTML, and Attribute Relationships
As previously noted, the element representing the component must be a `<div>` or `<table>` — the latter being used to represent interactive grids or tables. 

Apart from this requirement however the HTML architecture can be very flexible and meet many different design approaches. However, because of this flexibility some usage and relationship details needs to be clarified.

First and foremost, descriptive arguments are tied to specific nodes internally. This is reflected in the argument names — for example, the `activeDescendant` attribute must be added to the `referenceNode` to work. The following example shows the explicit argument relationships that exist internally, and represents the (near) total available HTML flexibility that is allowed (note: contexts can also be outside of a component element if desired):

<br>

```html
<component
	data-{component}="{id}">
	<reference
		data-{reference}="{id}"
		{orientation}
		{active-descendant}="{child-id}"
		{reference-focus}>
		<context
			data-{context}="{id}">
			<parent
				data-{parent}="{id}"
				>
				<child
					id="{child-id}"
					data-{child}="{id}"
					{child-focus}
					{selected}
					>
					
				</child>
				…
			</parent>
		</context>
	</reference>
</component>
```

<br>

The above example is a bit over-engineered for most situations. To combat this, all node attributes — except children — have fallback attributes they will use (see [Nodes](#nodes) for more details). It is possible then to create a succinct implementation that only requires the `data-{component}`, `{orientation}`, and `data-{child}` attributes to create a valid architecture:

<br>

```html
<component
	data-{component}="{id}"
	{orientation}>
		<child
			data-{child}="{id}">
			…
		</child>
		…
</component>
```

<br>

Note that attributes to define the navigation configuration would also be needed in this setup, depending on whether the component uses roving or reference navigation.

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
Regardless of the navigation pattern being used, there **must** be a single element within a component using this pattern that is focusable (either the reference node, or a child). This is required so that assistive technologies can communicate actions and state properly to users.

<br>

#### Data Attributes Mimic State
Some data- attributes are used to "mimic" state for elements that do not receive focus. Authors can use these attributes to enable CSS to communicate state to users if they wish to.

As an example, in a roving navigation pattern, while children technically get focus, to a user the "component" is the focus target. And it may be desirable to include styling to indicate this state.


<br>


## Data Objects and Properties
When using this module, three "data" objects are required for it to function: `props`, `data`, and `state`. 

<br>

The `props` object stores read-only data, and is where the configuration is stored:

```javascript
/**
 * @param {string} id - The id of the component.
 * @param {Object} attributes - An object with data- attribute strings.
 * @param {string} attributes.component - The data- attribute for the component node.
 * @param {string} attributes.reference - The data- attribute for the reference node.
 * @param {string} attributes.context - The data- attribute for context nodes.
 * @param {string} attributes.parent - The data- attribute for parent nodes.
 * @param {string} attributes.child - The data- attribute for child nodes.
 * 
 * @param {string} attributes.oreintation - The orientation of the component (horizontal, vertical, etc…).
 * @param {string} attributes.activeDescendant - The data- or aria- attribute storing the current active descendant.
 * @param {string} attributes.referenceFocus - he attribute used to track focus on the reference node.
 * @param {string} attributes.childfocus - The attribute used to track focus on child nodes.
 * @param {string} attributes.selected - The attribute used for "selection" within the component.
 * 
 * @param {Object} keys - An object storing navigation key names.
 * @param {array} keys.navigation - Keys used for composite navigation.
 * @param {array} keys.scroll - Keys that control scrolling.
 * 
 * @param {string} navigationType - Either "tabindex" (roving), or "activedescendant" (reference).
 * @param {boolean} selection - Indicates the component has selectable children.
 * @param {boolean} multiAxis - Indicates the component has multi-axis navigation.
 * /
```

<br>

The `data` object stores the static node references for the module:

```javascript
/**
 * @param {Object} nodes - An object containing static nodes.
 * @param {Object} nodes.component - The node that encapsulates the overall component.
 * @param {Object} nodes.reference - The node that stores reference data, or receives focus.
 * @param {Object} nodes.contexts - An array of all of the interaction contexts that exist.
 * /
```

<br>

Finally, the `state` object handles the context and data state of the module:

```javascript
/**
 *  @param {Object} navigation - An object containing dynamically set nodes.
 *  @param {Object} navigation.context - The node that represents the current navigation context.
 *  @param {Object} navigation.parent - The parent node in the current navigation context.
 *  @param {array} navigation.children - The children in the current navigation context.
 *  @param {Object} navigation.focusedChild - The current child that is "focused."
 *  @param {Object} navigation.lastFocusedChild - The last child that was "focused."
 * 
 * @param {boolean} isKeyEvent - Indicates if the current event is a key event.
 * @param {boolean} isPointerEvent - Indicates if the current event is a pointer event.
 * @param {boolean} clickEscapesConteext - Helps determine if a pointer event leaves the component.
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
- Add cross-axis navigation support.
- Add cross-axis enter/exit memory.