# DataCollection
The `DataCollection` class has two responsibilities: getting the collection, and storing it. Nearly everything else is handled in a different module.


<br>


## Setup
The basic setup of the collection module is as follows:

```javascript
const collectionArgs = {
	emitter: emitter
}
```

<br> 


The only required argument on instantiation is the `emitter` arg. Every other argument can be passed here, or to the `getCollection()` method later on. 

Additional arguments are as follows:

<br>

```javascript
/**
 * @param {string} [params.name] - The human-readable name of the collection (akin to aria-label or name attribute).
 * @param {string} [params.filepath] - The path and filename of the data needed.
 * @param {string} [params.objectKeyName] - The property name for the key that will store the object property key. When the JSON is an object of objects (not an array of objects).
 * @param {object} [params.prefilter]
 * @param {string} [params.prefilter.prop] - The object property to filter by.
 * @param {string} [params.prefilter.value] - The property value to include.
 * @param {object} [params.presort] 
 * @param {string} [params.presort.prop] - The object property to sort by.
 * @param {'asc' | 'desc'} [params.presort.direction] - The sort direction needed.
 */
```

<br>

It should be noted that the `filepath` and `name` arguments must be passed together, or errors will be thrown.

<br>

## Behavior and Usage
### Getting a Collection
In order for the entire feature to work, a dataset must be fetched asynchronously. This is handled by the `getCollection()` method, which can either use the instantiated arguments, or ones provided to the method directly. The latter example is shown below:

<br>

```javascript
collection.getCollection({
	name: 'Fruits',
	filepath: './test-fruits.json',
	presort: {
		prop: 'name',
		direction: 'asc' //default: 'asc'
	}
})
.then(() => {
	//fetch returns a promise, then…
	//update relevant data
});
```

<br>

Note that the `getCollection()` method will ***only*** use provided arguments if both the `filepath` and `name` arguments are provided. Otherwise it will default to what was initially passed to the class. 

<br> 

### Pre-Filtering and Sorting
If arguments are provided, the data collection can be filtered and/or sorted to condition the reference data as needed. Note however that if these features are used that only shallow keys are available for pre-filtering/sorting at present (no nested keys).