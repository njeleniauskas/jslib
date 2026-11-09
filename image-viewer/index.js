import setConfiguration from './library/set-configuration.js';
import initializeViewer from './library/initialize-viewer.js';
import addEvents from './library/add-events.js';

/**
 * @param {object} params
 * @param {string} params.id - The unique identifier for gallery elements.
 *
 * @param {object} params.props
 * @param {object} params.props.strings
 * @param {string} [params.props.strings.viewer] - The node representing the entire viewer.
 * @param {string} [params.props.strings.gallery] - The node for gallery images.
 * @param {string} [params.props.strings.image] - Each gallery image node.
 * @param {string} [params.props.strings.imageSrc] - The template for the image src.
 * @param {string} [params.props.strings.thumbnailSrc] - The template for thumbnail image src.
 * @param {string} [params.props.strings.imageControl] - Each button that controls image changes.
 * @param {string} [params.props.strings.buttonPrev] - The button to step to the previous image.
 * @param {string} [params.props.strings.buttonNext] - The button to step to next image.
 * @param {string} [params.props.strings.disabled] - The attribute used to indicate a button is disabled.
 * @param {string} [params.props.strings.summary] - The node that summarizes which image is currently displayed.
 *
 * @param {'static' | 'dynamic'} [params.props.type] - Whether the viewer should be built from static HTML or generated dynamically.
 * @param {'single' | 'multiple'} [params.props.display] - Whether the gallery should display a single image, or multiple.
 * @param {number} [params.props.distanceThreshold] - The distance needed to produce a successful swipe gesture.
 */

class ImageViewer {
	constructor(params) {
		this.id = null;
		this.props = {
			strings: {
				viewer: null,
				gallery: null,
				image: null,
				imageSrc: null,
				thumbnailSrc:null,
				imageControl: null,
				buttonPrev: null,
				buttonNext: null,
				disabled: null,
				summary: null,
			},
			type: null,
			display: null,
			distanceThreshold: null,
		};
		this.functions = {
			template: null,
			canUpdate: null,
		};
		this.nodes = {
			viewer: null,
			gallery: null,
			images: null,
			imageControl: null,
			buttonPrev: null,
			buttonNext: null,
			summary: null
		};
		this.data = {
			images: [],
			lastIndex: null,
		};
		this.state = {
			hasButtons: false,
			hasSummary: false,
			hasThumbnail: false, //what is this for?
			canUpdate: false,
			canSwipe: false,
			currentIndex: 0,
			pointerDistance: {},
		};
		this.emitter = null;

		this.#init(params);
	}

	async #init(params) {
		try {
			setConfiguration(this, params);
			await initializeViewer(this);
			addEvents(this);
		} catch (errors) {
			if (errors instanceof AggregateError) {
				console.error(errors.message)

				for (const error of errors.errors) {
					console.error(error.message);
				}
			} else {
				console.error(errors);
			}
		}
	}
}

export default ImageViewer;
