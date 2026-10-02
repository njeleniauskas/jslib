function getCollectionArgs(params, module) {
	const args = {};

	if (!params) {
		args.name = module.props.name;
		args.resource = module.props.resource;
		args.type = module.props.type;
		args.body = module.props.body;
		args.args = module.props.args;
	} else {
		const paramArgs = params.args ?? {};

		args.name = 'name' in params ? params.name : module.props.name;
		args.resource = 'resource' in params ? params.resource : module.props.resource;
		args.type = 'type' in params ? params.type : module.props.type;
		args.body = 'body' in params ?
			params.body : {};

		args.args = {};

		args.args.objectKeyName = 'objectKeyName' in paramArgs ?
			paramArgs.objectKeyName : module.props.args.objectKeyName;
		args.args.prefilter = 'prefilter' in paramArgs ?
			paramArgs.prefilter : module.props.args.prefilter;
		args.args.presort = 'presort' in paramArgs ?
			paramArgs.presort : module.props.args.presort;
	}

	return args;
}

export default getCollectionArgs;
