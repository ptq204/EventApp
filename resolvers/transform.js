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

const transformEvent = event => {
  var category = {
    0: 'Mobile',
	  1: 'Data Science',
    2: 'Web',
    3: 'Machine Learning',
    4: 'Deep Learning',
    5: 'Big Data'
  }
  var status = {
    0: 'waiting',
    1: 'approved'
  }
  try{
    const tmp = {
      ...event._doc,
      DateTime: dateToString(event.DateTime),
      Category: category[event.Category],
      Status: status[event.Status]
    }
    return tmp;
  }catch(err){
    throw err;
  }
}

const transformSortOptions = sorts => {
  var obj = {}
  for(let i = 0; i < sorts.length; i++){
    obj[sorts[i].field] = sorts[i].direction
  }
  console.log(obj);
  return obj;
}

module.exports = {
  events: events,
  transformEvent: transformEvent,
  transformSortOptions: transformSortOptions
}