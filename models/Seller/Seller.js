const mongoose = require("mongoose");
const { Schema } = mongoose;
const SellerSchema = new Schema({
  email: {
    type: 'String',
    default: 'N/A',
  },
  password: {
    type: 'String',
    default: 'N/A',
  },
  accountStatus: {
    type: 'String',
    default: 'de-activate',
  },
  name: {
    type: 'String',
    default: 'N/A',
  },
  image: {
    type: 'String',
    default: 'N/A',
  },
  address: {
    type: 'String',
    default: 'N/A',
  },
  city: {
    type: 'String',
    default: 'N/A',
  },
  pinCode: {
    type: 'String',
    default: 'N/A',
  },
  sellerId: {
    type: 'String',
    default: 'N/A',
  },
  products:[],
  orders:[],

  mobile: {
    type: 'String',
    default: 'N/A',
  },
  accountType: {
    type: 'String',
    default: 'seller',
  },
});

module.exports = mongoose.model("sellers", SellerSchema);