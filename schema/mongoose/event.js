const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const schema = mongoose.Schema;
const {SECRET, USER_ROLE} = require('../../config/config');

const EventSchema = new schema({
  Title: String,
  DateTime: Date,
  Address: String,
  Description: String,
  HostID: String,
  Types: [String],
  Speakers: [{}],
  PosterLink: String,
  BookLink: String,
  BookClickCount: Number,
  Status: Number
});

EventSchema.statics.addEvent = async (args) => {

	try{
		
		const event = await new Event({
			Title: args.title,
			DateTime: args.datetime,
			Address: args.address,
			Description: args.description,
			HostID: args.hostid,
			Types: args.types,
			Speakers: args.speakers,
			BookLink: args.booklink,
			PosterLink: args.posterlink,
			BookClickCount: 0,
			Status: 0
		});

		if(!event){
			console.log('Added event fail!');
			return null;
		}

		return event.save();
	
	}catch(err){
			throw err;
	}

}
const Event = mongoose.model('Event', EventSchema);
module.exports = Event;


