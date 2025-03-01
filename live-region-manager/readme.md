# Live Region Manager
A class managing a live-region element that communicates with multiple functions.

![Static Badge](https://img.shields.io/badge/Version-1.0-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)


<br>

## Overview and Use
The primary purpose of this module is to allow different functions that need to communicate to a single live-region to be able to do so and not worry about losing any messages that would occur if they were not bundled together.

To properly set up, a live-region element needs to exist in the DOM, and the only required prop is the query string for that node. 

```javascript
const liveRegionManager = new LiveRegionManager({
	node: '[data-live-region]',
});
```

Optionally, authors can define a custom `delay` window — the time the manager waits to deliver the collection of messages (2ms default).