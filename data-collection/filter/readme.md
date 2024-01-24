# DataCollectionFilter
The `DataCollectionFilter` class handles the live filtering of the collection. It relies on additional `FilterGroup` components to collect active filters from the interface.

<br>


## Setup
The basic configuration of the filter module is very simple as it only needs the emitter to function:

<br>

```javascript
const filterArgs = {
	emitter: emitter
}
```

<br>

In addition to the emitter, the overall filter class can be given two additional arguments:

<br>

```javascript
/**
 * @param {number} [params.delay] - The delay window for processing input events (keyup). The defuault is 250ms.
 * @param {boolean} [params.deepFilter] - Whether the filter process is shallow or deep. Deep uses recursion to find any nested property.
 */
```


<br>


## Behavior and Usage
### The FilterGroup Component
In order to have an effect on the collection, this class relies on `FilterGroup` components to pass in their state (via emitter) to function. See the filter group module for information on how to set up fitler groups.

<br>

### Getting a FilterGroup State
On first setup, the filter module needs to collect the current state of the filters in the DOM. This is done by two class methods: `getGroupedFilterKeys()` and `getFilterGroups()`. These two methods need to be called after the dataset has been fetched and is ready as they will trigger a `emitter.emit('process-collection')` event. To prevent errors, these methods should be called within the returned promise of the `DataColletion.getCollection()` method:

<br>

```javascript
collection.getCollection()
.then(() => {
	filter.getGroupedFilterKeys();
	filter.getFilterGroups();
});
```

<br>

During normal operation, these updates are handled automatically.


<br>

### Input Delimiters
When using `<input>` elements as filters, users can use delimiters to separate or conditionalize the contents of the input:

- Commas (`,`) will separate each value so that multple values from the input can be tested (e.g. `"string, another string"`). For number ranges, a comma separates the two values of the range (e.g. `"3, 5"`).
- Hyphens (`-`) or en-dashes (`–`) can be used to identify number ranges (e.g. `3–6`), along with commas.

<br>

### Filter Values
For binary selection, values should match the value desired, ignoring case sensitivity. One special case exists however. When a filter control has the `all` value, it will always return `true` for the entire filter group when selected. This should only be used for single-selection, binary filter groups (it's only relevant there).

In addition, `FilterGroup` components cannot overlap another existing `FilterGroup`. For example, if one FilterGroup contains `propA` and `propB`, these strings cannot be used in another component (it will throw errors).

<br>

## Roadmap
- allow multiple filter groups of the same type (through disable/swapping, or through filter changes).