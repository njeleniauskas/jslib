# Data Collection
A collection of modules that handle individual features of a live data collection.

![Static Badge](https://img.shields.io/badge/Version-1.4-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)

<br>

## Overview
A DataCollection is a array of items whose display can be manipulated by a user via an interface — for example, a list of products that can be filtered. Each module handles a specific piece of functionality and may depend on other components/modules to function properly.


<br>


## Basic Setup
While a the feature can be set up in a few different ways, the basic requirements of a data collection are: 

- Including the `DataCollection` class.
- Including the `DataCollectionPresenter` class.
- Including the `EventEmitter` class to handle reactive events.

An example of a data collection that includes the filter and presentation modules is as follows. Note that setup occurs in two stages: instantiation, and updating classes after the dataset is available:

<br>

```javascript
//import modules
import EventEmitter from '../common/event-emitter/index.min.js';
import FilterGroup from '../filter-group/index.min.js';
import DataCollection from  '../data-collection/collection/index.min.js';
import DataCollectionFilter from '../data-collection/filter/index.min.js';
import DataCollectionPresenter from '../data-collection/presenter/index.min.js';


//instantiate classes
const emitter = new EventEmitter();

const collectionArgs = {
	name: 'Fruits',
	filepath: './test-data.json',
	emitter: emitter
};

const collection = new DataCollection(collectionArgs);

const filterArgs = {
	emitter: emitter
};

const filterModule = new DataCollectionFilter(filterArgs);

const presenterArgs = {
	id: 'fruits',
	attributes: {
		container: 'data-dc-container',
		collection: 'data-dc-collection',
		liveRegion: 'data-dc-live-region'
	},
	templates: {
		'list': template,
	},
	emitter: emitter
};	

const presenterModule = new DataCollectionPresenter(presenterArgs);


//once everything is initialized
collection.getCollection()
.then(() => {
	filterModule.getGroupedFilterKeys();
	filterModules.getFilterGroups();
});
```

<br>

With the overall setup, there are two important notes to be made. First, the `EventEmitter` must be instantiated before everything else. And second, authors only need to explicitly run the `emitter.emit('process-collection')` event if the collection is not first rendered server-side.

See each module for additional details on how each can be configured.


<br>


## Feature Roadmap
- Re-integrate sorting module.
- Re-integrate pagination module.
- Change pre-filter/sort functions to allow operation via any property depth.