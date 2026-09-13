# Display Switcher (Composite)
A component that handles the toggling of sections within a page, from a controllable composite element.

![Static Badge](https://img.shields.io/badge/Version-1.2-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)
![Static Badge](https://img.shields.io/badge/Language-JavaScript-%232C67BF)
![Static Badge](https://img.shields.io/badge/License-MIT-%232C67BF)


<br>


## Overview
A Display Switcher handles the changing of sections of a web page from a collection of control options. Functionally this component is similar to a `tablist`, however it is more flexible as the relationship between control and views can be **one-to-many** as well as being non-adjacent to one another.

Note that using this component requires an understanding of how the [Composite Element](https://github.com/njeleniauskas/jslib/tree/master/common/composite-navigation) and [Composite Navigation](https://github.com/njeleniauskas/jslib/tree/master/common/composite-navigation) modules work.


<br>


## Usage
Because this module is an extension of a CompositeElement, the requirements for this component are an extension of that module. In practice however, authors can implement and id-only configuration which will simply fall back to a roving navigation pattern with internal data attributes:

<br>

```javascript
import DisplaySwticher from '../path/to/module/display-switcher/index.js';

const args = {
	id: 'ds1'
};

const DisplaySwitcher = new DisplaySwticher(args);
```

<br>

The HTML setup is also simple to implement, only adding a few extra attributes to each element:

```html
<Context
	data-cn="{id}"
	{orientation}>
		<Child
			data-cn-control-id="{linkID}"
			data-cn-child="{id}"
			{selected}
			{focused}>
		</Child>
		...
</Context>

<View
	data-cn-view-id="{linkID}"
	data-cn-view="{id}"
	{display}>
</View>
```

A few additions that authors may wish to include are as follows:

- Additional attributes can be passed, which include: `viewNode`, `controlID`, `viewID`, `selected`, and `display`. Note that `controlID` and `viewID` need the exact same value to link together.
- A shared `EventEmitter` can be used by passing it as an argument. But if none is supplied, an internal one will be used.

<br>

```javascript
const args = {
	attributes: {,
		viewNode: 'data-dsw-view',
		controlID: 'id', //or a data- attribute
		viewID: 'data-dsw-view-id',
		selected: 'aria-selected',
		display: 'aria-hidden'
	},
	emitter: EventEmitter
};
```

<br>

Note that for attribute args, `data-` or `aria-` attributes can be supplied. And the `id` attribute can be used for the controlID if desired.

<br>


## Additional Notes
- The fallback attribute names follow the naming schema for Composite Navigation (`data-cn-*`). If authors simply wish to implement the simplest form of this class, they can use these defaults.
