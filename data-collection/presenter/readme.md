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
	<div aria-live="polite" data-{live-region}="ID"></div>
	<div data-{collection}="ID">
		...
	</div>
</div>
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
		liveRegion: 'data-{live-region}'
	},
	templates: {
		'{display}': template,
	},
	emitter: emitter
};	
```

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
 * @param {string} params.attribute - The attribute identifying the collection node.
 * @param {string} params.id - The id of the attribute to correctly query the right node.
 * @param {number} [params.startingIndex] - The index the loop should start at.
 * @param {number} [params.endingIndex] - The index the loop should end at.
 */
```

<br>

Note that the last two arguments are only useful when the pagination module is in use.


<br>


## Behavior and Usage
### Template Keys
When passed to the class, template keys identify the type of display that should be rendered — for example 'list' or 'grid'. If more than one semplate is supplied, the first key in the tempalte object will be the default.