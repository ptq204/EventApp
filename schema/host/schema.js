const graphql = require('graphql');

const {
	GraphQLString,
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLSchema
} = graphql

const HostInputType = new GraphQLInputObjectType({
	name: 'HostInputType',
	description: 'Type definition of host parameter of host',
	fields: () => ({
		HostName: {type: GraphQLString},
		Description: {type: GraphQLString},
		Mail: {type: GraphQLString},
		Website: {type: GraphQLString},
		Phone: {type: GraphQLString},
	})
});

const HostType = new GraphQLObjectType({
	name: 'HostType',
	description: 'Type definition of host output type',
	fields: () => ({
		id: {type: GraphQLID},
		HostName: {type: GraphQLString},
		Description: {type: GraphQLString},
		Mail: {type: GraphQLString},
		Website: {type: GraphQLString},
		Phone: {type: GraphQLString},
		UserID: {type: GraphQLString}
	})
});

module.exports = {
  HostInputType: HostInputType,
	HostType: HostType,
}