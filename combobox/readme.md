# Combobox
A component that handles the behaviors for different element + list combinations.

![Static Badge](https://img.shields.io/badge/Version-1.0-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)
![Static Badge](https://img.shields.io/badge/Language-JavaScript-%232C67BF)
![Static Badge](https://img.shields.io/badge/License-MIT-%232C67BF)


<br>


## Overview
Broadly, a Combobox is a class of component + collection that can be configured to be one of several more specific components. But practically, it is a CompositeElement made up of a single (focusable) element that represents or controls another element in some way.

<br>

Because this definition is so broad a Combobox can be a lot of things: a simple select component, a text box that filters a list of options, or even a search input that returns a list of results. The common denominator however is that the component element either

- represents the list in some way; or
- controls what the list itself shows to users.

<br>


## Usage
Because a Combobox is an extension of a CompositeElement, the core focus and navigation behaviors follow that module. And because of the nature of a Combobox, only the **reference** navigation pattern is allowed for this component.

<br>

Setting up more specific functionality is easy to accomplish, but it is possible to only pass an ID and the component will fall back to a more well-established implementation of a Combobox (text input + disclosable listbox):

<br>

```javascript
import Combobox from '../path/to/module/combobox/index.js';

const args = {
	id: 'cb1'
};

const combobox = new Combobox(args);
```

<br>

Setting up the HTML is also simple as you only need a few extra details beyond a CompositeElement's core requirements:

```html
<input
	type="text"
	{orientation}="horizontal"
	{contextSelected}="true"
	{contextRole}="component"
	data-cb="{id}">

<Listbox
	{orientation}="vertical"
	{contextSelected}="true"
	{contextRole}="listbox"
	data-cb="{id}">
	<Item
		data-cb-child="{id}"
		{childName}"{id}"
		>
	</Item>
	...
</Listbox>
```

<br>

Because a Combobox's behavior can differ a lot, there are several properties that can be used to configure the component to one's desired specifications. These `props` are as follows:

<br>

| Property | Default | Description |
| --- | --- | --- |
| `preseed` | `false` | Whether the listbox elements should already exist in the DOM before interaction, or be fetched on the first query. |
| `searchable` | `true` | Must be `true` if using an input that allows typable queries When false, the component element will have its `textContent` written to if selection is both `true` and `coupled`. |
| `searchDelay` | `150ms` | The delay time used for the query function (debounce timing). |
| `searchMutatesChildren` | `false` | Indicates that a query will mutate the listbox in the DOM (Combobox will re-assess the context after mutation if `true`).|
| `disclosable` | `true` | Whether the listbox is disclosable or not. |
| `discloseOnFocusin` | `true` | When disclosable, should the listbox be displayed when the component receives focus? When `true`, it will also disclose the listbox when the component is clicked. |
| `returnFocusToComponent` | `true` | When true, return focus back to the component after  a child has been interacted with. |
| `selectable` | `true` | Whether the listbox items can be selected or not. |
| `selectBehavior` | `coupled` | Whether selection should be `coupled` or `independent` from the input query. |

<br>

Additional attributes are also available to use, overriding their defaults:

```javascript
/**
 * @param {string} attributes.childName - The name of the attribute that stores the value of the item.
 * @param {string} attributes.expanded - The attribute that indicates a component's listbox is hidden/visible.
 * @param {string} attributes.hidden - The attribute that marks a listbox as shown/hidden.
 * @param {string} attributes.valueMatch - The attribute used to flag exact matches when a query string is used to represent a selection.
 * @param {string} attributes.selected - The attribute representing the selection state of a child.
 */
```


## Custom Query Functions
The most important aspect of a Combobox is that it ***does not handle*** the getting of data or rendering it to the DOM. For this reason, authors need to provide a custom function if they wish to handle data that is not **already** in the DOM, such as an API query, or fetch request.

<br>

```javascript
const queryFunction = (event, module) => {
	//custom fetch → render functionality
}

const args = {
	id: 'cb1',
	functions: {
		query: {
			emitterReadyEvent: 'some-external-event-name',
			callback: queryFunction
		}
	}
};
```

<br>

Internally, the custom query function has access to the class module and event (if it exists) when called on the `input` or `compositionend` events. And an `emitterReadyEvent` name can be passed via the query object to have an existing emitter event call the internal `query-function-end` event.

<br>

Beyond these basics, data can be handled in a few different ways and they all fall into 1 of 3 categories:

- Data is handled entirely by a class/function outside of the Combobox.
- Data is fetched or assigned from a resource (file or JS object) and stored internally.
- Data exists in the DOM and is also stored (cloned) in inernally.

<br>

And there are a few things that can help accomplish this.

<br>

First, authors can use the class methods `runQuery` and `updateQueryArgs` to assign new data for the query, or trigger the query function. And both methods can be passed query args in case the data source or options need to change.

```javascript
const combobox = new Combobox(args);
const queryArgs = {};

//updating query args only
combobox.updateQueryArgs({
	src: 'src/string',
	args: queryArgs
});

//running a query, with arguments
combobox.runQuery({
	src: 'src/string',
	args: queryArgs
});
```

<br>

Additionally, a few internal properties exist to help facilitate different behaviors/performance optimizations:

- `module.state.queryArgs`: the property to store arguments for your query.
- `module.state.querySrc`: the URL request for the query (string).
- `module.state.dataSrc`: the URL request (string) that was last used; updated after the query finishes.
- `module.state.data`: the place where data should be stored.

<br>

By using these properties, different types of behaviors can exist, whether that's fetching 1 data source and then switching to a new source later, preventing redundant fetch requests if the query/data src strings match, or simply cloning the data that originally existed in the DOM.

<br>

The following function is a simple example where data is fetched from a location and then rendered to the DOM:

```javascript
const queryFunction = async (event, module) => {
	if (module.state.data === null) {
		// fetch data and assign it to module.state.data
	}

	const fragment = new DocumentFragment();

	for (const [key, data] of Object.entries(module.state.data)) {
		// create items and append to the fragment
	}

	module.nodes.listbox.appendChild(fragment);
}
```

<br>

It is also possible ignore all of these properties if the query function gives an outside piece of functionality complete control over the query-to-render pipeline.

<br>

Lastly, if the query function mutates the DOM authors will need to capture the last focused child before mutation occurs so that focus can be re-applied correctly after the listbox is re-rendered. This means setting `args.searchMutatesChildren` to `true` and then adding a class method call in the query function that captures what child was last in focus:

```javascript
const queryFunction = async (event, module) => {
	module.getFocusedChildName();

	// remainder of processing
}
```

<br>


## Additional Notes
- For this class to work properly, the component node must be either a context node, or a child of one (with the same 'component' role).
- In addition to the emitter events for a CompositeElement, one additional one exists for when the query function ends, called `query-function-end`.
- The orientation of the context element that contains the component must be the same as the writing direction of the component for context switching to work properly. In other words, an inline text input must have `orientation=horizontal` (required for cross-axis context switching to work properly).


<br>


## Future Exploration
- Add a disclosure button functionality for pointers (toggle disclosure of listbox).
