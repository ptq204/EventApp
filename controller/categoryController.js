const Category = require('../models/categoryModel');

module.exports = {
  find: async (opts) => {
    try{
      return Category.find(opts).then(categories => {
        return categories;
      });
    }catch(err){
      throw err;
    }
  },

  addCategory: async (args) => {
    try{
      const category = await new Category({
        Name: args.name,
        Value: args.value
      });

      if(!category){
        console.log('Cannot add new category!');
        return null;
      }

      console.log('Added new category!');
      console.log(category);
      return category.save();

    }catch(err){
      throw err;
    }
  }
}