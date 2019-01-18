const graphql = require('graphql');
const graphql_iso_date = require('graphql-iso-date');
const Event = require('../mongoose/event');

const {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLList,
    GraphQLEnumType,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLSchema
} = graphql

const {
    GraphQLDate,
    GraphQLDateTime
} = graphql_iso_date

const SpeakersInputType = new GraphQLInputObjectType({
    name: 'SpeakerInputType',
    description: 'Type definition for speaker parameter of an event',
    fields: () => ({
        Fullname: {type: GraphQLString},
        Career: {type: GraphQLString},
        AvatarLink: {type: GraphQLString}

    })
});

const EventStatusType = new GraphQLEnumType({
    name: 'EventStatusType',
    values: {
        waiting: {value: 0},
        approved: {value: 1}
    }
});

const EventType = new GraphQLObjectType({
    name: 'EventType',
    description: 'Type definition of event',
    fields: () => ({
        Title: {type: GraphQLString},
        DateTime: {type: GraphQLDateTime},
        Address: {type: GraphQLString},
        Description: {type: GraphQLString},
        HostID: {type: GraphQLString},
        Types: {type: new GraphQLList(GraphQLString)},
        PosterLink: {type: GraphQLString},
        BookLink: {type: GraphQLString},
        BookClickCount: {type: GraphQLInt},
        Status: {type: EventStatusType},
    }),

});

const mutation = new GraphQLObjectType({
    name: 'mutation',
    description: 'All mutations',
    fields: {
        addEvent: {
            type: EventType,
            args: {
                title: {type: GraphQLString},
                datetime: {type: GraphQLDateTime},
                address: {type: GraphQLString},
                description: {type: GraphQLString},
                hostid: {type: GraphQLString},
                types: {type: new GraphQLList(GraphQLString)},
                posterlink: {type: GraphQLString},
                booklink: {type: GraphQLString},
                status: {type: EventStatusType},
                speakers: {type: new GraphQLList(SpeakersInputType)},
            },
            resolve(parent, args){
                return Event.addEvent(args);
            }
        }
    }
});

const schema = new GraphQLSchema({
    mutation: mutation
});
module.exports = schema;