# JavaScript Library
A library of components and modules for building modern, accessible products.

![GitHub tag (with filter)](https://img.shields.io/github/v/tag/njeleniauskas/jslib?color=27B17E)
![Static Badge](https://img.shields.io/badge/Language-JavaScript-%232C67BF)
![Static Badge](https://img.shields.io/badge/Format-Modules-%232C67BF)
![Static Badge](https://img.shields.io/badge/License-MIT-%232C67BF)


<br>


## Project Overview
The goal of this project is to help authors build modern, accessible products quickly and easily in a no-dependency environment. It's designed with the goal of separating functionalities into discrete, reusable packages. And it is structured into three types of modules/functions that help with these different needs:

<br>

- **Specific Module**:
Specific modules represent individual components or features. These are the most complete packages in the library and commonly include other modules/functions from this library to work properly.

- **Common Modules**:
Common modules provide discete functionalities as a package — for example, navigating a composite element (like a tab component). They do not work on their own, but help to provide specific needs for a given component/feature.

- **Utility Functions**:
Utility functions handle highly specific situations, and are too small/universal to be included in a module.

<br>

## Folder Structure
```
common/
	common-module/
	...
	utilities/
		...
specific-module/
...
```

<br>

## Notes
- Authors should consult `readme.md` files to learn how to use modules successfully.
- Within readme files `data-` attributes will commonly be shown as `data-{identifier}` to help explain context. Authors should replace `{identifier}` with the attribute they want to use in production.
- Most components will rely on DOM state as the source of truth to build the internal state that a module works with.