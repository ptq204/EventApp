const Host = require('../controller/hostController');

module.exports = {
  Query: {
    hosts: (parent, args, req) => {
      return Host.find({});
    },
  },

  Mutation: {
    addHost: (parent, args, req) => {
      return Host.addHost(args, req.user._id);
    }
  }
}