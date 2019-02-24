const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CategorySchema = new schema({
  Name: {
    type: String 
  },
  Value: {
    type: Number
  }
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;