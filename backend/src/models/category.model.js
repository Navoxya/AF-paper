const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    code: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'vehicles'}]
  });
  
  const Category = mongoose.model('categories', CategorySchema);
  module.exports = Category;