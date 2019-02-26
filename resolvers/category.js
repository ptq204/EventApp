const Category = require('../controller/categoryController');

module.exports = {
  Query: {
    categories: async (parent, args, req) => {
      const categories = Category.find({});
      console.log(categories);
      if(categories !== undefined){
        return categories;
      }
      return null;
    }
  },

  Mutation: {
    addCategory: async (parent, args, req) => {
      return Category.addCategory(args);
    }
  }
}