import setAttributeByValue from '../utilities/set-attribute-by-value.js';
import setAttributeByToggle from '../utilities/set-attribute-by-toggle.js';

/**
 * Pass focus from one element to another (direct or indirect).
 * @param {object} params 
 * @param {object} params.receiver - The node receiving focus.
 * @param {object} [params.passer] - The passing node related to the receiver by attribute ID.
 * @param {object} [params.indicator] - The indicator used (class or attribute).
 * @param {'attribute' | 'class'} [params.indicatorType] - The type of indicator used.
 * @param {boolean} [params.attributeByValue] - Whether 'statedness' is by a specific value or  the existence of an attribute.
 * @param {'direct' | 'indirect'} type - How focus should be handled. The default is 'direct'. */

function updateFocusPair(params, type = 'direct') {
	if (type === 'direct') {
		params.receiver.focus();
	} else {
		if (params.indicatorType === 'attribute') {
			if (params.attributeByValue) {
				setAttributeByValue(params.receiver, params.indicator, true);
				setAttributeByValue(params.passer, params.indicator, false);
			} else {
				setAttributeByToggle(params.receiver, params.indicator, true);
				setAttributeByToggle(params.passer, params.indicator, false);
			}
		} else {
			params.passer.classList.remove(params.indicator);
			params.receiver.classList.add(params.indicator);
		}
	}
}

export default updateFocusPair;