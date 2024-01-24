# Event Emitter
A class to handle reactive events in an application.

![Static Badge](https://img.shields.io/badge/Version-1.0-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)


<br>

## Overview
The `EventEmitter` class is similar to most standard versions of this class. The methods that can be used are `add`, `remove`, and `emit`. And there is one special edition.

<br>

### Specific Function Orders
When adding events to a queue, an optional 3rd argument can be supplied in case authors wish to control the order functions get run in. An example of this is the following:

<br>

```javascript
emitter.add('new-function-stack', args, 2); //the third function to run
```

<br>

When doing so, the added function will run in that index, and allows authors to run a specific order of functions if desired.