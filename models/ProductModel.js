const { Schema },
  mongoose = require('mongoose');

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Float32Array, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
