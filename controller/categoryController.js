const Category = require('../models/categoryModel');

module.exports = {
  find: async (opts) => {
    try{
      return Category.find(opts).then(categories => {
        for(let i =0; i < categories.length; i++){
          console.log(categories[i]['Name'])
          if(categories[i]['Name'] === 'New'){
            let tmp = categories[i];
            categories.splice(i, 1);
            categories.unshift(tmp);
            break;
          }
        }
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