const User = require('../controller/userController');

module.exports = {
  Query: {
    users: (parent, args, req) => {
      return User.find({});
    },
    login: (parent, args, req) => {
      return User.auth(args);
    },
  },
  Mutation: {
    createUser: (parent, args, req) => {
      return User.createUser(args.username, args.password, args.email, args.phone, args.social);
    },

    authGoogleUser: (parent, args, req) => {
      return User.authGoogleUser(args.token);
    }
  }
}
