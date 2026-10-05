# DataCollectionPresenter
The `DataCollectionPresenter` class handles rendering the collection based on how other modules have prepared the live collection.

<br>

## Setup
Because the presenter interacts directly with the DOM, proper setup includes a few more steps.

<br>

### HTML
At minimum, HTML for the container and live region must be present. The collection element is optional as it is automatically added on the first render:

<br>

```html
<div data-{container}="ID">
	<div data-{collection}="ID">
		...
	</div>
</div>

<!--somewhere else -->
<div aria-live="polite" data-{live-region}=""></div>
```

<br>

### Module Arguments
The module requires a few more arguments beyond the emitter, including a unique id, node attributes, and at least one display template:

<br>

```javascript
const presenterArgs = {
	id: 'ID',
	attributes: {
		container: 'data-{container}',
		collection: 'data-{collection}',
		liveRegion: '{live-region}'
	},
	templates: {
		'{display}': template,
	},
	emitter: emitter,
	messages: {
		empty: () => `No matches found.`,
		showing: () => `Showing {num} {objects}`
	}
};
```

<br>

One specific behavior with arguments are with messages. Custom messages can be passed for when a list is empty (`empty`) or has items (`showing`), and these can be strings or template literals wrapped in an anonymous function (`() =>`). This setup is used so that a template literal uses internal properties like `presenter.props.name` and `presenter.state.displaySize` it will not throw an error. An example of this is ``empty: () => `Showing ${presenter.state.displaySize} ${presenter.props.name}.` ``

<br>


### Collection Templates
The presenter must be supplied a template function (identified by a display key) so it knows how to render the collection. The basic outline of the function is as follows, using an unordered list as the collection element:

<br>

```javascript
const template = function(data, params) {
	let collection = document.createElement('ul');

	collection.setAttribute(params.attribute, params.id);

	for (const object of data) {
		const node = document.createElement('li');

		//..build each collection item

		collection.appendChild(node);
	}

	return collection;
}
```

<br>

Within this function authors have access to a few parameters, three of which are required:

<br>

```javascript
/**
 * @param {array} data - The array of objects to loop through.
 * @param {number} [params.startingIndex] - The index the loop should start at.
 * @param {number} [params.endingIndex] - The index the loop should end at.
 * @param {number} [params.mesage] - The message to be used.
 */
```

<br>

Note that the last two arguments are only useful when the pagination module is in use.


<br>


## Behavior and Usage
### Emitter Events for Processing
Beyond the essential conection/update events that the emitter captures, additional state events exist as well if authors want to add behavior for these stages:

- `render-collection-start`: fires when `renderCollection()` begins
- `render-collection-end`: fires when `renderCollection()` ends

<br>

### Live Region Managers
If there are multiple collections in the DOM, you will need to pass a liveEventManager property to the class, so that no messages get lost in processing. To include this functionality, simply pass the LiveRegionManager class to the presenter:

```javascript
const presenterArgs = {
	liveRegionManager: lrManager
};
```

<br>


### Template Keys
When passed to the class, template keys identify the type of display that should be rendered — for example 'list' or 'grid'. If more than one template is supplied, the first key in the tempalte object will be the default.
