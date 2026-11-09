# ImageViewer
A class that handles the viewing of an image (or images).

![Static Badge](https://img.shields.io/badge/Version-1.0-%2327B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)

<br>

## Overview and Use
Broadly, an `ImageViewer` handles different behaviors around viewing a single or multiple images in more detail: whether that's choosing an image to view, or changing the viewed image (or images) within a collection.

<br>

To set up this class correctly, an ID needs to be passed to the class at minimum, and nodes for the image controls, gallery, and image element need to exist in the DOM:

```javascript
const viewer = new ImageViewer({
	id: 'set1'
});
```

<br>

```html
<!--image control-->
<button
	data-src="{src}"
	data-alt="{alt}"
	data-iv-control="{id}">
</button>

<div
	data-iv-gallery="{id}">
	<img
		data-iv-image="{id"
		src="{src}"
		alt="{alt}">
</div>
```

<br>

Beyond this setup a number of different configurations may exist:

<br>

### Type
By default the viewer will be set to `type:static`. However, if set to `dynamic` authors will need to provide a template function that dynamically gets the images that are part of the collection (in the DOM or via a fetch) and build the template that will be inserted into the viewer node. Passing this to the class is as follows:

```javascript
const templateFn = (strings) => {
	// fn has access to all internal string properties
	// return the template built for the viewer
};

const viewer = new ImageViewer({
	id: 'set1',
	functions: {
		template: templateFn
	}
});
```

<br>

Note that the template itself should return a template that will be (internally) rendered to the DOM. And it has access to every internal string being used for nodes/state checks.

<br>

### Multiple Images
If more than one image belongs to the same collection a few additional behaviors are available for authors:

- Buttons can be added to step between each image in the collection.
- A summary can be added to indicate which image is currently being viewed.
- The user will be able to swipe to change images.

<br>

Adding these additional nodes is as simple as adding elements with the appropriate class/attributes.

<br>


### Gating Keydown control
One important detail is that by default, users will not be able to use keys to control the viewer until the internal property `canUpdate` is set to `true`. This ensures that authors can set up the appropriate gate to allow/disallow these behaviors. And there are two ways to do this.

<br>

First, authors can pass a `canUpdate` function that sets the conditions for when updating should be available via keydown keys (`ArrowLeft`, `ArrowRight`, `Home`, `End`):

```javascript
const args = {
	functions: {
		canUpdate: updateFn
	}
};
```

<br>

Second, if an event emitter is used, authors can also use this event to toggle the update gate:


```javascript
emitter.emit(`image-viewer/set1:can-update`, { canUpdate: true });
```

<br>

### Image Sources
By default, the image referenced on the control (in `data-src`) is the default name for the images that will be used in the viewer. However, if different images need to be used for the gallery images or thumbnails, authors can provide a template for `imageSrc` and `thumbnailSrc` to change each.

<br>

To accomplish this, authors only need to include any strings within brackets, e.g. `{file}` or `{path}`, and any additional information will be inserted in the correct position. With `/path/to/image.png` for example, if `imageSrc: {file}-lg` and `thumbnailSrc: {file}-thumb` are provided, the resulting src strings will be `/path/to/image-lg.png` and `/path/to/img-thumb.png`.

<br>

### Swiping
Swipe behaviors are automatically added if there is more than 1 image in the collection. And authors can control the x-axis distance needed to produce a valid swipe by using the `distanceThreshold` argument (a percentage of `window.innerWidth`).

<br>

## Notes
The following params can all be changed when initializing the class (via args). Note that when changing any of the node strings, that the querySelector should include the `id` to ensure the right collection is gathered.

```javascript
/**
 * @param {object} params.props
 * @param {object} params.props.strings
 * @param {string} [params.props.strings.viewer] -
 * @param {string} [params.props.strings.gallery] -
 * @param {string} [params.props.strings.image] -
 * @param {string} [params.props.strings.imageSrc] -
 * @param {string} [params.props.strings.thumbnailSrc] -
 * @param {string} [params.props.strings.imageControl] -
 * @param {string} [params.props.strings.buttonPrev] -
 * @param {string} [params.props.strings.buttonNext] -
 * @param {string} [params.props.strings.disabled] -
 * @param {string} [params.props.strings.summary] -
 *
 * @param {'static' | 'dynamic'} [params.props.type] -
 * @param {'single' | 'multiple'} [params.props.display] -
 * @param {number} [params.props.distanceThreshold] -
 */
```

 <br>

 A few additional notes are as follows:

 - At present, only `display: single` is available (single image view).
 - Three element details are handled internallyk by setting `data-disabled` for step buttons and `data-src` and `data-alt` for image properties.
 - The template fun
 - If using markdown, the setup requires html or attribute/class additions.
