const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  category: String,
  price: Number,
  stock: Number,
  product_images: [String],
  title: String,
  short_description: String,
  long_description: String,

  // ✅ New field
  tags: {
    type: [String],
    default: []
  }
});


module.exports = mongoose.model('Product', productSchema);
