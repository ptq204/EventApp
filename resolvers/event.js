const Event = require('../controller/eventController');
const { transformEvent } = require('./transform');
const { dateToString } = require('../helper/date');


const StatusMap = {
  'waiting': 0,
  'approved': 1
}

module.exports = {
  Query: {
    events: async (parent, args, req) => {
      const events = await Event.find({}, args);
      if(events !== undefined){
        return events;
      }
      else return null;
    },

    eventsById: async (parent, args, req) => {
      const event =await Event.findById(args._id);
      if(event !== undefined){
        return event;
      }
      else return null;
    },

    waitingEvents: async (parent, args, req) => {
      const events = await Event.find({Status: StatusMap.waiting}, args);
      if(events !== undefined){
        return events;
      }
      else return null;
    },
  
    /*eventsByCategory: async (parent, args, req) => {
      const events = await Event.findByCategory(CategoryMap[args.category], args);
      if(events !== undefined){
        return events;
      }
      else return null;
    },*/
  
    myEvents: async (parent, args, req) => {
      const events = await Event.find({Creator: req.user._id}, args);
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