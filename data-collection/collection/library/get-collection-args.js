function getCollectionArgs(params, module) {
	const args = {};

	if (!params) {
		args.type = module.props.type;
		args.resource = module.props.resource;
		args.name = module.props.name;
		args.options = module.props.options;
		args.transform = module.props.transform;
	} else {

		args.type = 'type' in params ? params.type : module.props.type;
		args.resource = 'resource' in params ? params.resource : module.props.resource;
		args.name = 'name' in params ? params.name : module.props.name;
		args.options = 'options' in params ?
			params.options : {};

		const transformArgs = params.transform ?? {};

		args.transform = {};
		args.transform.objectKeyName = 'objectKeyName' in transformArgs ?
			transformArgs.objectKeyName : module.props.transform.objectKeyName;
		args.transform.prefilter = 'prefilter' in transformArgs ?
			transformArgs.prefilter : module.props.transform.prefilter;
		args.transform.presort = 'presort' in transformArgs ?
			transformArgs.presort : module.props.transform.presort;
	}

	return args;
}

export default getCollectionArgs;
