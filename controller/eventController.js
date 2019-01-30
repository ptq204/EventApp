const Event = require('../models/eventModel');
const { dateToString }  = require('../helper/date');

EventSchema = {
  
  // Create new event
  addEvent: async (args, userid) => {

    try{
      
      const event = await new Event({
        Title: args.title,
        DateTime: new Date(args.datetime),
        Address: args.address,
        Description: args.description,
        HostID: args.hostid,
        Creator: userid,
        Category: args.category,
        Types: args.types,
        Speakers: args.speakers,
        BookLink: args.booklink,
        PosterLink: args.posterlink,
        BookClickCount: 0,
        Status: 0,
      });
  
      if(!event){
        console.log('Added event fail!');
        return null;
      }
  
      console.log('Added new event!');
      return event.save();
    
    }catch(err){
      throw err;
    }
  },

  // find event
  find: async (obj) => {
    try{
      return Event.find(obj).populate('Host').populate('Creator').then(events => {
        console.log(events);
        return events.map(event => {
          event.DateTime = dateToString(event.DateTime);
          return event;
        });
      });
    }catch(err){
      throw err;
    }
  },

  // find event by ID
  findById: async (id) => {
    try{
      return Event.findById(id).populate('Host').populate('Creator').then(events => {
        console.log(events);
        return events.map(event => {
          event.DateTime = dateToString(event.DateTime);
        });
      });
    }catch(err){
      throw err;
    }
  },
  
  // Remove an event
  removeEvent: async (id) => {
    Event.remove({_id: id}, (err) => {
      if(err) throw err;
      console.log('Removed one event!');
    });
  }
}

module.exports = EventSchema;