const Event = require('../controller/eventController');
const { transformEvent } = require('./transform');
const { dateToString } = require('../helper/date');

const CategoryMap = {
  'Mobile': 0,
	'Data Science': 1,
  'Web': 2,
  'Machine Learning': 3,
  'Deep Learning': 4,
  'Big Data': 5
}

const StatusMap = {
  'waiting': 0,
  'approved': 1
}

module.exports = {
  Query: {
    events: async () => {
      const events = await Event.find({});
      if(events !== undefined){
        return events;
      }
      else return null;
    },

    eventsById: async (parent, args, req) => {
      const event =await Event.find({_id: args._id});
      if(event !== undefined){
        return event;
      }
      else return null;
    },

    waitingEvents: async () => {
      const events = await Event.find({Status: StatusMap.waiting});
      if(events !== undefined){
        return events;
      }
      else return null;
    },
  
    eventsByCategory: async (parent, args, req) => {
      const events = await Event.find({Category: CategoryMap[args.category]});
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