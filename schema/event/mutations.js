const { Event} = require('../event/schema');
const { SpeakerInputType } = require('../speaker/schema');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const Event = require('../../controller/eventController');

const mutation = new GraphQLObjectType({
  name: 'EventMutation',
  description: 'Mutations for event schema',
  fields: {
    addEvent: {
			type: EventType,
			args: {
				title: {type: GraphQLString},
				datetime: {type: GraphQLDateTime},
				address: {type: GraphQLString},
				description: {type: GraphQLString},
				hostid: {type: GraphQLString},
				category: {type: GraphQLInt},
				types: {type: new GraphQLList(GraphQLString)},
				posterlink: {type: GraphQLString},
				booklink: {type: GraphQLString},
				speakers: {type: new GraphQLList(SpeakerInputType)},
			},
			resolve: async (parent, args, context) => {
				const event = await Event.addEvent(args, context.user);
				return event;
			}
    },
    
    removeEvent: {
			type: EventType,
			args: {
				id: {type: GraphQLString},
			},
			resolve(parent, args){
				return Event.removeEvent(args.id);
			}
		}
  }
});

module.exports = mutation;