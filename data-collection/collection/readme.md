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
 * Note: name, resource, and type args are required if not supplied on instantiation.
 *
 * @param {object} [params.data] - The arguments needed for data collection.
 * @param {string} [params.data.name] - The human-readable name of the collection (akin to aria-label or name attribute).
 * @param {string} params.data.resource - The uri of the resource needed.
 * @param {string} [params.data.type] - The type of resource being requested [file, or query].
 * @param {object} [params.data.args]
 * @param {string} [params.data.args.objectKeyName] - The property name for the key that will store the object property key. When the JSON is a map (not an array of objects).
 * @param {{prop: string, value: string}[]}} [params.data.args.prefilter] - An array of prefilter key/value objects. * @param {object} [params.data.args.presort]
 * @param {string} [params.data.args.presort.prop] - The object property to sort by.
 * @param {'asc' | 'desc'} [params.data.args.presort.direction] - The sort direction needed.
 */
```

<br>

It should be noted that the `resource` and `name` and `type` arguments must be passed together, or errors will be thrown.

<br>

## Behavior and Usage
### Getting a Collection
In order for the entire feature to work, a dataset must be fetched asynchronously. This is handled by the `getCollection()` method, which can either use the instantiated arguments, or ones provided to the method directly. The latter example is shown below:

<br>

```javascript
collection.getCollection({
	name: 'Fruits',
	resource: './test-fruits.json',
	type: 'file',
	args: {
		presort: {
			prop: 'name',
			direction: 'asc' //default: 'asc'
		}
	}
})
.then(() => {
	//fetch returns a promise, then…
	//update relevant data
});
```

<br>

Note that when passing arguments to the `getCollection()` method, two things will happen. First, the method will not validate if the `resource` and `name` and `type` arguments are not provided. And second, if an propery is not provided in the object, it will default to what was previously passed to the class.

<br>

In the future, the `getCollection()` method will also support database queries.

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
