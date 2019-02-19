const Event = require('../controller/eventController');
const { transformEvent } = require('./transform');
const { dateToString } = require('../helper/date');

module.exports = {
  Query: {
    events: async () => {
      const events = await Event.find({});
      if(events !== undefined){
        return events;
      }
      else return null;
    },

    waitingEvents: async () => {
      const events = await Event.find({Status: 0});
      if(events !== undefined){
        return events;
      }
      else return null;
    },
  
    eventsByCategory: async (parent, args, req) => {
      const events = await Event.find({Category: args.category});
      if(events !== undefined){
        return events;
      }
      else return null;
    },
  
    myEvents: async (parent, args, req) => {
      const events = await Event.find({Creator: req.user._id});
      if(events !== undefined){
        return events;
      }
      else return null;
    },
  },
  
  Mutation: {
    addEvent: (parent, args, req) => {
      console.log('eqweqw');
      return Event.addEvent(args, req.user._id);
    },
    
    updateEvent: (parent, args, req) => {
      return Event.update(args, req.user);
    },

    removeEvent: (parent, args, req) => {
      return Event.removeEvent(args.id);
    }
  }
}