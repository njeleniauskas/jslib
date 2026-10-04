# DataCollection
The `DataCollection` class has two responsibilities: getting the collection, and storing it. Nearly everything else is handled in a different module.


<br>


## Setup
The basic setup of the collection module is as follows:

```javascript
const collectionArgs = {
	id: 'fruits',
	emitter: emitter
}
```

<br>


The only required arguments on instantiation are the `id` and `emitter` args. Every other argument can be omitted, or passed to the `getCollection()` method later on.

Additional arguments are as follows:

<br>

```javascript
/**
 * Note: type, resource, and name args are required if not supplied on instantiation.
 *
 * @param {object} [params.data] - The arguments needed (and optional) for data collection.
 * @param {string} [params.data.type] - The type of resource being requested [object, or featch].
 * @param {string} [params.data.resource] - The uri of the resource needed.
 * @param {string} [params.data.name] - The human-readable name of the collection (akin to aria-label or name attribute).
 * @param {object} [params.data.options] - The options used in the fetch request.
 *
 * @param {object} [params.data.transform]
 * @param {string} [params.data.transform.objectKeyName] - The property name for the key that will store the object property key. When the JSON is a map (not an array of objects).
 * @param {{prop: string, value: string}[]}} [params.data.transform.prefilter] - An array of prefilter key/value objects. * @param {object} [params.data.transform.presort]
 * @param {string} [params.data.transform.presort.prop] - The object property to sort by.
 * @param {'asc' | 'desc'} [params.data.transform.presort.direction] - The sort direction needed. */
```

<br>

It should be noted that the `type`, `resource` and `name` arguments must be passed together, or errors will be thrown.

<br>

## Behavior and Usage
### Getting a Collection
In order for the entire feature to work, a dataset must be retrieved. This is handled by the `getCollection()` method, which can either use the instantiated arguments, or ones provided to the method directly. The latter example is shown below:

<br>

```javascript
collection.getCollection({
	type: 'fetch',
	resource: './test-fruits.json',
	name: 'Fruits',
	transform: {
		presort: {
			prop: 'name',
			direction: 'asc' //default: 'asc'
		}
	}
})
.then((data) => {
	//fetch returns a promise, then…
	//update relevant data
});
```

<br>

Note that when passing arguments to the `getCollection()` method, two things will happen. First, the method will not validate if the `type`, `resource` and `name` arguments are not provided. And second, if a propery is not provided in the object, it will default to what was previously passed to the class.

<br>

Authors can also control the arguments for this method as well. Note that the class also expects the retrieved data to be transformed into JSON for use.

 - `type`: Determines how data is retrieved. When `type: 'object'`, authors can pass a javascript object directly to the method for use. When `type: 'fetch'`, any type of fetch will be available (file, api query, etc…).
- `resource`: (string or object) The URL or object where data should be retrieved from.
- `name`: The name of the collection for HTML labeling.
- `options`: An (optional) object that can be passed to a fetch request.
- `transform`: Transform args process the data after it is retrieved, and can be prefiltered or presorted.

<br>

Finally, getCollection returns a promise with the `data.live` if authors wish to use this data outside of the internal data collection functions. But this is optional.

<br>

### Pre-Filtering and Sorting
If arguments are provided, the data collection can be filtered and/or sorted to condition the reference data as needed. Note however that if these features are used that only shallow keys are available for pre-filtering/sorting at present (no nested keys). Filters do however take an array of objects to allow multiple filters to be used:

```javascript
prefilter : [
	{
		prop: 'type',
		value; 'item'
	}
]
```
