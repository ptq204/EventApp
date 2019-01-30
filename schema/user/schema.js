const graphql = require('graphql');
const graphql_iso_date = require('graphql-iso-date');

const {
	GraphQLString,
	GraphQLList,
	GraphQLObjectType,
	GraphQLID,
	GraphQLSchema
} = graphql

const {
	GraphQLDateTime
} = graphql_iso_date

const UserType = new GraphQLObjectType({
	name: 'UserType',
	description: 'Type definition of user',
	fields: () => ({
		id: {type: GraphQLID},
		Username: {type: GraphQLString},
    Password: {type: GraphQLString},
    Birthdate: {type: GraphQLDateTime},
    Phone: {type: GraphQLString},
    Email: {type: GraphQLString},
    Company: {type: GraphQLString},
    AvatarLink: {type: GraphQLString},
    SocialLink: {type: GraphQLString},
    Role: {type: GraphQLString},
    Bookmarks: {type: new GraphQLList(GraphQLString)},
	})
});

module.exports = {
	UserType: UserType,
}