const Event = require('../controller/eventController');
const User = require('../models/userModel');
const { dateToString } = require('../helper/date');

const events = async events => {
  try{
    return events.map(event => {
      return transformEvent(event);
    }) 
  }catch(err){
    throw err;
  }
}

const transformEvent = async event => {
  try{
    event.DateTime = dateToString(event.DateTime);
    return event;
  }catch(err){
    throw err;
  }
}

module.exports = {
  events: events,
  transformEvent: transformEvent
}