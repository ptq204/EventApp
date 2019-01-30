const { HostType } = require('./schema');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const Host = require('../../controller/hostController');


const mutation = new GraphQLObjectType({
  name: 'HostMutation',
  description: 'Mutation for host schema',
  fields: {
    addHost: {
			type: HostType,
			args: {
				hostname: {type: GraphQLString},
				description: {type: GraphQLString},
				mail: {type: GraphQLString},
				website: {type: GraphQLString},
				phone: {type: GraphQLString},
				userid: {type: GraphQLString},
			},
			resolve(parent, args, context){
				const host = Host.addHost(args, context.user._id);
				return host;
			}
		},
  }
});

module.exports = mutation;


