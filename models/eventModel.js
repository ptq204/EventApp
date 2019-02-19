const mongoose = require('mongoose');
const schema = mongoose.Schema;

const EventSchema = new schema({
  Title: String,
  DateTime: Date,
  Address: String,
	Description: String,
	Category: Number,
  Types: [String],
  Speakers: [{}],
  PosterLink: String,
  Images: [String],
  BookLink: String,
  BookClickCount: Number,
  Status: Number,
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