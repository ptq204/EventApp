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

input SortEventBy {
  field: String!,
  direction: Int!
}

type User {
  _id: ID!,
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
  _id: ID!,
	Title: String!,
  DateTime: String!,
  Time: String,
  Address: String,
  Description: String,
  Host: Host,
  Category: [String!]!,
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
  _id: ID!,
  HostName: String!,
  Description: String,
  Mail: String,
  Website: String,
  Phone: String,
  UserID: String!
  InEvents: Event
}

type Category {
  _id: ID!,
  Name: String!,
  Value: Int!
}

type Edge {
  cursor: String!
  node: Event
}

type PageInfo {
  endCursor: String
  hasNextPage: Boolean!
}

type ResultCursor {
  edges: [Edge]!
  pageInfo: PageInfo
  totalCount: Int!
}

type Query {
  events(category: String, sort: [SortEventBy!], first: Int, after: String): [Event]
  eventsById(_id: String!): Event
  waitingEvents(category: String, sort: [SortEventBy!]): [Event]
  myEvents(status: String): [Event]
  login(email: String!, password: String!): String
  users: [User!]
  hosts: [Host!]
  categories: [Category!]!
}

type Mutation {
  createUser(
    username: String!,
    password: String!,
    email: String!,
    phone: String,
    social: String
  ): User
  authGoogleUser(token: String!): String
  addEvent(
    title: String!,
    datetime: String!,
    time: String,
    address: String!,
    description: String,
    host: String,
    category: [Int!]!,
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
    category: [Int],
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
  addCategory(name: String!, value: Int!): Category
}
`;