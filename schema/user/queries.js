const { GraphQLObjectType, GraphQLList } = require('graphql')
const User = require('../../controller/userController');

const query = new GraphQLObjectType({
  name: 'UserQuery',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args){
        return User.find({});
      }
    },
  }
});

module.exports = query;