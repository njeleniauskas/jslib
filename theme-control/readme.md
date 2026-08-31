# Theme Control
A class to control theme switching.

![Static Badge](https://img.shields.io/badge/Version-1.0-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)

<br>

## Overview and Use
At minimum, a control element needs to exist in the DOM, and arguments passes to the class:

<br>

```javascript
const args = {
	strings: {
		root: 'data-theme',
		control: 'data-theme-control',
	},
	themes: ['light', 'dark']
}

const themeControl = new ThemeControl(args);
```

<br>

In addition, the critical.js file will need to be added to the `<head>` in order to properly set the user theme and prevent FOUC issues:


```html
<head>
	<!--somewhere in the head-->
	<script>
		//inline critical.js styles here
	</script>
</head>
```

<br>

Finally, CSS should contain the custom properties/styles that each theme name will apply to the root element to drive each theme.

<br>

## Notes
- The default state of the theme is populated from the user's system preference.
- The root data attribute is needed to set the theme. CSS should be written to be controlled by the value of this attribute.
- Multi-state controls rely on `props.themes` to select the order of themes. 
- If using multi-state controls, the name of the theme can be communicated via the `props.strings.controlState` pointer. However, authors should also provide context for the control as well, such as: Theme: `dark`.
- If using single-state controls, a separate function will be needed to handle the right aria-selected/pressed states that need to be communicated.