const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: { type: String, required: true },
  listImageURL: [String],
  color: [String],
  mainColor: { type: String, required: true },
  size: { type: String, required: true },
  productType: { type: String, required: true },
});

productSchema.methods.getAllProducts = function () {
  return this.find().exec();
};
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
