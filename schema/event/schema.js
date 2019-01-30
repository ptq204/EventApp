const graphql = require('graphql');
const graphql_iso_date = require('graphql-iso-date');
const { SpeakerType } = require('../speaker/schema');

const {
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLEnumType,
	GraphQLObjectType,
	GraphQLID,
	GraphQLSchema
} = graphql

const {
	GraphQLDateTime
} = graphql_iso_date

const EventStatusType = new GraphQLEnumType({
	name: 'EventStatusType',
	values: {
		waiting: {value: 0},
		approved: {value: 1}
	}
});

const EventCategoryType = new GraphQLEnumType({
	name: 'EventCategoryType',
	values: {
		'mobile': {value: 0},
		'data_science': {value: 1},
		'web': {value: 2}
	}
});

const EventType = new GraphQLObjectType({
	name: 'EventType',
	description: 'Type definition of event',
	fields: () => ({
		id: {type: GraphQLID},
		Title: {type: GraphQLString},
		DateTime: {type: GraphQLDateTime},
		Address: {type: GraphQLString},
		Description: {type: GraphQLString},
		UserID: {type: GraphQLString},
		HostID: {type: GraphQLString},
		Category: {type: EventCategoryType},
		Types: {type: new GraphQLList(GraphQLString)},
		PosterLink: {type: GraphQLString},
		BookLink: {type: GraphQLString},
		BookClickCount: {type: GraphQLInt},
		Status: {type: EventStatusType},
		Speakers: {
			type: new GraphQLList(SpeakerType),
		},
	}),
});


module.exports = {
  EventStatusType: EventStatusType,
  EventCategoryType: EventCategoryType,
	EventType: EventType,
}