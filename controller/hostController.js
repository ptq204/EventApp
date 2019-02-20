const Host = require('../models/hostModel');

HostSchema = {
  find: async (opts) => {
    return Host.find(opts).then(host => {
      return host;
    })
  },

  addHost: async (args, userid) => {

    var info = {};
  
    if(args.hostname) info.HostName = args.hostname;
    if(args.description) info.Description = args.description;
    if(args.website) info.Website = args.website;
    if(args.mail) info.Mail = args.mail;
    if(args.phone) info.Phone = args.phone;
    info.UserID = userid;
  
    try{
  
      const host = await new Host(info);
  
      if(!host){
          console.log('Add host fail!');
          return null;
      }
  
      console.log('Added new host!');
  
      return host.save();
  
    }catch(err){
      throw err;
    }
  }, 

  updateHost: async (args) => {

    var info = {};
  
    if(args.hostname) info.HostName = args.hostname;
    if(args.description) info.Description = args.description;
    if(args.website) info.Website = args.website;
    if(args.email) info.Email = args.email;
    if(args.phone) info.Phone = args.phone;
  
    return Host.findByIdAndUpdate({_id: args.id}, info, {'new': true}, (err, obj) => {
      if(err) return null;
      console.log('Updated successfully!');
      return obj;
    });
  }
}

module.exports = HostSchema;