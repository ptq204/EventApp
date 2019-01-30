const Host = require('../controller/hostController');

module.exports = {
  Mutation: {
    addHost: (parent, args, req) => {
      return Host.addHost(args, req.user._id);
    }
  }
}