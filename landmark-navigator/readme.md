# Landmark Navigator
A class that handles the navigation between landmark regions.

![Static Badge](https://img.shields.io/badge/Version-1.0-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)

<br>

## Overview and Use
Setting up a `LandmarkNavigator` is simple, and only requires that the proper attributes needed to identify each landmark exists in HTML. However, authors can also explicitly pass an attribute and key if they wish.

<br>

```javascript
const navigator = new LandmarkNavigator({
	key: 'F6',
	attribute: '[data-landmark]'
});
```

<br>

Authors can also pass the `event.key` name if they wish to use a specific key, but the default `key` is `F6`.

<br>

A few additional notes should be made about this class too:

- Aria landmarks can be highly context dependent, so using an attribute to identify each landmark is a simpler and more reliable identifier than trying to detect "actual" landmark regions.
- Cycling between landmark regions will not trap users in the browser's page section and can move freely to the address bar and other sections by `key` or `shift + key`.
- Both the `attribute` and `key` properties are optional args, and will fall back to `[data-landmark]` and `F6` if not provided.
- If an interactive element is focused, activating the landmark key will attempt to focus the parent landmark, and if none exists, the first landmark in the page will be focused.

<br>

## Assignable properties
```javascript
/**
 * @param {object} params
 * @param {string} atttribute - The data attribute to identify landmark regions.
 * @param {string} key - The name of the event.key that controls navigation.
 */
```
