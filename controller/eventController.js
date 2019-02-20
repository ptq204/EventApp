const Event = require('../models/eventModel');
const { dateToString }  = require('../helper/date');
const { transformEvent, transformSortOptions } = require('../resolvers/transform');
const { ADMIN_ROLE, USER_ROLE } = require('../config/config');

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
  find: async (opts, args) => {
    var sortOpts = args.sort ? transformSortOptions(args.sort) : {};
    try{
      return Event.find(opts).populate('Host').populate('Creator').sort(sortOpts).then(events => {
        //console.log(events);
        return events.map(event => {
          //event.DateTime = dateToString(event.DateTime);
          return transformEvent(event);
        });
      });
    }catch(err){
      throw err;
    }
  },

  // find event by ID
  findById: async (id) => {
    try{
      return Event.findById(id).populate('Host').populate('Creator').then(event => {
        //console.log(events);
        return transformEvent(event);
      });
    }catch(err){
      throw err;
    }
  },
  
  // find by Category
  findByCategory: async (category, args) => {
    try{
      return Event.find({Category: {$all: [category]}}).then(events => {
        return events.map(event => {
          return transformEvent(event);
        })
      })
    }catch(err){
      throw err;
    }
  },

  update: async (args, user) => {

    try{
      var objUpdate = {};
    
      const event = await Event.findOne({_id: args.id}, (err, ev) => {
        if(err){
          console.log('Cannot find this event!');
          return null;
        }
        return ev;
      });

      if(user.role === ADMIN_ROLE || (user.role === USER_ROLE && user._id === event.Creator.toString())){
        if(args.title) objUpdate.Title = args.title;
        if(args.dateTime) objUpdate.DateTime = args.dateTime;
        if(args.address) objUpdate.Address = args.address;
        if(args.description) objUpdate.Description = args.description;
        if(args.category) objUpdate.Category = args.category;
        if(args.types) objUpdate.Types = args.types;
        if(args.speakers) objUpdate.Speakers = args.speakers;
        if(args.bookLink) objUpdate.BookLink = args.bookLink;
        if(args.posterLink) objUpdate.PosterLink = args.posterLink;
        if(args.bookClickCount) objUpdate.BookClickCount = args.bookClickCount;
        if(args.status) objUpdate.Status = args.status;
        
        return Event.findOneAndUpdate({_id: args.id}, objUpdate, {'new': true}, (err, obj) => {
          if(err) throw err;
          console.log('Updated an event!');
          return obj;
        })
      }
      else{
        console.log('This user does not hold this event!');
        return null;
      }

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