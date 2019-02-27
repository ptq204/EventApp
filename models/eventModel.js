const mongoose = require('mongoose');
const schema = mongoose.Schema;

const EventSchema = new schema({
  Title: {
    type: String,
  },
  DateTime: {
    type: Date
  },
  Time: {
    type: String
  },
  Address: {
    type: String
  },
	Description: {
    type: String
  },
	Category: {
    type: [Number]
  },
  Types: {
    type: [String]
  },
  Speakers: {
    type: [{}]
  },
  PosterLink: {
    type: String
  },
  Images: {
    type: [String]
  },
  BookLink: {
    type: String
  },
  BookClickCount: {
    type: Number
  },
  Status: {
    type: Number
  },
  Host: {
    type: schema.Types.ObjectId,
    ref: 'Host'
  },
  Creator: {
    type: schema.Types.ObjectId,
    ref: 'User'
  }
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;