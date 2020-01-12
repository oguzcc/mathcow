const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = {
    name: Joi.string().required(),
    price: Joi.number().required()
  };

  return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = validateProduct;
