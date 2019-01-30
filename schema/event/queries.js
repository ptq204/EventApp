const {EventType, EventCategoryType, EventStatusType } = require('./schema');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const Event = require('../../controller/eventController');

const query = new GraphQLObjectType({
  name: 'EventQuery',
  description: 'Queries for event schema',
  fields: {
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args){
        return Event.find({});
      }
    },

    eventsByCategory: {
      type: new GraphQLList(EventType),
      args: {
        category: {type: GraphQLInt},
      },
      resolve(parent, args){
        return Event.find({Category: args.category});
      }
    },

    myEvents: {
      type: new GraphQLList(EventType),
      resolve(parent, args, context){
        return Event.find({UserID: context.user._id});
      }
    }
  }
});

module.exports = query;