const {GraphQLString, GraphQLObjectType, GraphQLInputObjectType,} = require('graphql');


const SpeakerInputType = new GraphQLInputObjectType({
	name: 'SpeakerInputType',
	description: 'Type definition of speaker parameter of an event',
	fields: () => ({
		Fullname: {type: GraphQLString},
		Career: {type: GraphQLString},
		AvatarLink: {type: GraphQLString}
	})
});

const SpeakerType = new GraphQLObjectType({
	name: 'Speakers',
	description: 'Type definition of Speaker output',
	fields: () => ({
		Fullname: {type: GraphQLString},
		Career: {type: GraphQLString},
		AvatarLink: {type: GraphQLString},
	})
});

module.exports = {
  SpeakerInputType: SpeakerInputType,
  SpeakerType: SpeakerType
}