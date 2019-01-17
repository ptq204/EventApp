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
  PosterLink: String,
  BookLink: String,
  BookClickCount: Number
});

EventSchema.statics.addEvent = async (args) => {

  try{
    
    const event = await new Event({
      Title: args.title,
      DateTime: args.date,
      Address: args.address,
      Description: args.description,
      HostID: args.hostid,
      Types: args.types,
    })
  
  }catch(err){
    throw err;
  }

}
const Event = mongoose.model('Event', EventSchema);
module.exports = Event;


