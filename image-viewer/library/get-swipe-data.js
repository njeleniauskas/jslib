function getSwipeData(event, module) {
	const distanceThreshold = window.innerWidth * module.props.distanceThreshold;
	const distanceStart = module.state.pointerDistance;
	const distanceEnd = event.screenX;

	const delta = distanceEnd - distanceStart;
	const valid = Math.abs(delta) > distanceThreshold;
	const direction = delta < 0 ? 'next' : delta > 0 ? 'prev' : null;

	return {
		valid,
		direction,
	};
}

export default getSwipeData;
