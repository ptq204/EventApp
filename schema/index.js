const { gql } = require('apollo-server');

module.exports = gql`

enum EventCategory {
  mobile
	data_science
	web
}

enum EventStatus {
  waiting
  approved
}

type Speaker {
  Fullname: String,
	Career: String,
	AvatarLink: String,
}

input SpeakerInput {
  Fullname: String,
	Career: String,
	AvatarLink: String,
}

type User {
  id: ID,
  GoogleID: String,
  FacebookID: String,
  Username: String,
  Birthdate: String,
  Phone: String,
  Email: String,
  Company: String,
  AvatarLink: String,
  SocialLink: String,
  Role: String,
  Bookmarks: [String],
}

type Event {
  _id: ID,
	Title: String,
  DateTime: String,
  Address: String,
  Description: String,
  Host: Host,
  Category: String,
  Types: [String],
  PosterLink: String,
  Images: [String],
  BookLink: String,
  BookClickCount: Int,
  Status: String,
  Speakers: [Speaker],
  Creator: User
}

type Host {
  id: ID!,
  HostName: String!,
  Description: String,
  Mail: String,
  Website: String,
  Phone: String,
  UserID: String!
}

type Query {
  events: [Event]
  eventsById(_id: String!): Event
  eventsByCategory(category: String!): [Event]
  waitingEvents: [Event]
  myEvents: [Event]
  login(email: String!, password: String!): String
  users: [User!]
  
}

type Mutation {
  createUser(
    username: String!,
    password: String!,
    email: String!,
    phone: String,
    social: String
  ): User
  addEvent(
    title: String!,
    datetime: String!,
    address: String,
    description: String,
    hostid: String,
    category: Int!,
    types: [String],
    posterlink: String,
    booklink: String,
    speakers: [SpeakerInput],
  ): Event
  updateEvent(
    id: String!,
    title: String,
    dateTime: String,
    address: String,
    description: String,
    category: Int,
    types: [String],
    speakers: [SpeakerInput],
    bookLink: String,
    posterLink: String,
    bookClickCount: Int,
    status: Int
  ): Event
  removeEvent(id: String!): Event
  addHost(
    hostname: String!,
    description: String,
    mail: String,
    website: String,
    phone: String,
  ): Host
}
`;