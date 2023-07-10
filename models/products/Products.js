const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductSchema = new Schema({
  productName: {
    type: 'String',
    default: 'N/A',
  },
  productTitle: {
    type: 'String',
    default: 'N/A',
  },
  productPrice: {
    type: 'String',
    default: 'N/A',
  },
  productDiscount: {
    type: 'String',
    default: 'N/A',
  },
  dummyPrice: {
    type: 'String',
    default: 'N/A',
  },
  productCategory: {
    type: 'String',
    default: 'N/A',
  },
  productPic1: {
    type: 'String',
    default: 'N/A',
  },
  productPic2: {
    type: 'String',
    default: 'N/A',
  },
  productPic3:{
    type: 'String',
    default: 'N/A',
  },
  productStock: {
    type: 'String',
    default: 'N/A',
  },
  productDiscription: {
    type: 'String',
    default: 'N/A',
  },
});

module.exports = mongoose.model("products", ProductSchema);