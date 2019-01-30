const { GraphQLObjectType, GraphQLString } = require('graphql');
const { UserType } = require('./schema');
const User = require('../../controller/userController');

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'All mutations',
	fields: {
		
		login: {
			type: GraphQLString,
			args: {
				email: {type: new GraphQLNonNull(GraphQLString)},
				password: {type: new GraphQLNonNull(GraphQLString)}
			},
			resolve(parent, args){
				return User.auth(args);
			}
		},

		createUser: {
			type: UserType,
			args: {
				username: {type: GraphQLString},
				password: {type: GraphQLString},
				email: {type: GraphQLString},
				phone: {type: GraphQLString},
				social: {type: GraphQLString}
			},
			resolve(parent, args){
				return User.createUser(args.username, args.password, args.email, args.phone, args.social);
			}
		},
	}
});

module.exports = mutation;