const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  userId: {
    type: 'String',
    default: 'N/A',
  },
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
    default: 'Active',
  },
  firstName: {
    type: 'String',
    default: 'N/A',
  },
  lastName: {
    type: 'String',
    default: 'N/A',
  },
  image: {
    type: 'String',
    default: 'N/A',
  },
  token: {
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
  state: {
    type: 'String',
    default: 'N/A',
  },
  zipCode: {
    type: 'String',
    default: 'N/A',
  },
  orders: [],
 
  mobile: {
    type: 'String',
    default: 'N/A',
  },
});

module.exports = mongoose.model("users", UserSchema);